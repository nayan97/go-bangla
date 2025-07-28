import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import { useParams, useNavigate } from "react-router";

const EditTourPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosdata = useAxiosSecure();

  const [guides, setGuides] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [faqList, setFaqList] = useState([]);

  const { register, handleSubmit, setValue, getValues } = useForm();

  // 🔃 Load data on mount
  useEffect(() => {
    // Load guides
    axiosdata.get("/api/guides").then((res) => {
      const activeGuides = res.data.filter((g) => g.status === "active");
      setGuides(activeGuides);
    });

    // Load package
    axiosdata.get(`/api/packagesby/${id}`).then((res) => {
      const p = res.data;
      setValue("title", p.title);
      setValue("type", p.type);
      setValue("price", p.price);
      setValue("about", p.about);
      setImageUrls(p.images || []);
      setFaqList(p.faqs || []);
      setValue("guideIds", p.guideIds || []);
    });
  }, [id]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    setUploading(true);
    const uploaded = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_upload_key
          }`,
          formData
        );
        uploaded.push(res.data.data.url);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setImageUrls((prev) => [...prev, ...uploaded]);
    setUploading(false);
  };

  const handleRemoveImage = (urlToRemove) => {
    setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const handleAddFaq = () => {
    const { question, answer } = getValues();
    if (!question || !answer) {
      return Swal.fire(
        "Warning",
        "Please fill both question and answer.",
        "warning"
      );
    }
    setFaqList((prev) => [...prev, { question, answer }]);
    setValue("question", "");
    setValue("answer", "");
  };

  const handleRemoveFaq = (index) => {
    setFaqList((prev) => prev.filter((_, i) => i !== index));
  };


  // remove guide 
  const handleRemoveGuide = async (guideNameToRemove) => {
  const updatedGuides = getValues("guideIds").filter(
    (name) => name !== guideNameToRemove
  );

  try {
    // Patch API to update guideIds in DB
    await axiosdata.patch(`/api/packages/${id}`, {
      guideIds: updatedGuides,
    });
    await axiosdata.patch(`/api/packages/${id}`, {
  guideIds: updatedGuides, // only this gets updated, others stay
});

    setValue("guideIds", updatedGuides); // ✅ update local form state
    Swal.fire("Removed!", `Guide "${guideNameToRemove}" has been removed.`, "success");
  } catch (err) {
    console.error("Failed to remove guide:", err);
    Swal.fire("Error", "Could not remove guide. Try again.", "error");
  }
};


  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      about: data.about,
      type: data.type,
      price: data.price,
      guideIds: Array.isArray(data.guideIds) ? data.guideIds : [],
      faqs: faqList,
      setImages: imageUrls, // ✅ this tells backend to replace images
    };

    try {
      await axiosdata.patch(`/api/packages/${id}`, payload);
      Swal.fire("Success!", "Tour package updated successfully.", "success");
      navigate("/dashboard/manage-tour");
    } catch (error) {
      console.error("Error updating package:", error);
      Swal.fire("Error", "Failed to update package.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Tour Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
        />
        <input
          {...register("type")}
          type="text"
          placeholder="Type"
          className="input input-bordered w-full"
        />
        <input
          {...register("price")}
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
        />
        <textarea
          {...register("about")}
          rows={4}
          placeholder="About"
          className="textarea textarea-bordered w-full"
        />

        {/* FAQ Section */}
        <div className="border border-amber-100 py-3 shadow-xl px-1">
          <input
            type="text"
            {...register("question")}
            placeholder="Add Day Plan"
            className="input input-bordered w-full"
          />
          <textarea
            {...register("answer")}
            placeholder="Details of the plan"
            className="textarea textarea-bordered w-full"
          />
          <button
            type="button"
            onClick={handleAddFaq}
            className="btn btn-accent my-2"
          >
            ➕ Add
          </button>
          {faqList.map((faq, index) => (
            <div key={index} className="text-sm my-1">
              <strong>Q:</strong> {faq.question} <br />
              <strong>A:</strong> {faq.answer}
              <button
                onClick={() => handleRemoveFaq(index)}
                className="btn btn-xs btn-error ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Guide Multi-Select */}
        <Select
          isMulti
          defaultValue={[]}
          options={guides.map((guide) => ({
            value: guide.email,
            label: guide.name,
          }))}
          onChange={(selectedOptions) =>
            setValue(
              "guideIds",
              selectedOptions.map((opt) => opt.value)
            )
          }
        />



        <input type="hidden" {...register("guideIds")} />
        {/* ✅ Show selected guides with Remove option */}
{getValues("guideIds")?.length > 0 && (
  <div className="mt-3">
    <h4 className="font-semibold mb-1">Assigned Guides:</h4>
    <ul className="space-y-1">
      {getValues("guideIds").map((guideName, index) => (
        <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded">
          <span>{guideName}</span>
          <button
            type="button"
            className="btn btn-xs btn-error"
            onClick={() => handleRemoveGuide(guideName)}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  </div>
)}


        {/* Images */}
        <div>
          <p className="font-medium mb-2">Images:</p>
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative">
                <img src={url} className="rounded shadow" />
                <button
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-1 right-1 btn btn-xs btn-error"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {uploading && (
            <p className="text-blue-500 text-sm">Uploading images...</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          Update Package
        </button>
      </form>
    </div>
  );
};

export default EditTourPackage;
