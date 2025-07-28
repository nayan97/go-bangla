import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

const AddTourPackage = () => {
  const axiosdata = useAxiosSecure();
  const [guides, setGuides] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [faqList, setFaqList] = useState([]); // ✅ FAQ state

  const { register, handleSubmit, reset, setValue, getValues } = useForm();

  useEffect(() => {
    axiosdata
      .get("/api/guides")
      .then((res) => {
        const activeGuides = res.data.filter(
          (guide) => guide.status === "active"
        );
        setGuides(activeGuides);
      })
      .catch((err) => console.error("Error fetching guides:", err));
  }, []);

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

  // ✅ Add FAQ to local list
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

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      about: data.about,
      type: data.type,
      price: data.price,
      guideIds: Array.isArray(data.guideIds) ? data.guideIds : [],
      images: imageUrls.length ? imageUrls : [],
      faqs: faqList.length ? faqList : [],
    };

    try {
      const res = await axiosdata.post("/api/packages", payload);
      Swal.fire("Success!", "Tour package added successfully.", "success");
      
      reset();
      setImageUrls([]);
      setFaqList([]);
    } catch (error) {
      console.error("Error saving package:", error);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Tour Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Tour Title"
          className="input input-bordered w-full"
        />
        <input
          {...register("type", { required: true })}
          type="text"
          placeholder="Beach -Adventure-Cultural- etc"
          className="input input-bordered w-full"
        />
        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Tour package price"
          className="input input-bordered w-full"
        />
        <textarea
          {...register("about", { required: true })}
          placeholder="About the Tour"
          className="textarea textarea-bordered w-full"
          rows={4}
        />

        {/* ✅ FAQ Inputs */}

        <div className="border border-amber-100 py-3 shadow-xl px-1">
          <div>
            <label className="block font-medium mb-1">Add Day Plan</label>
            <input
              type="text"
              {...register("question")}
              placeholder="Add Day Plan"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Details of whole day Plan
            </label>
            <textarea
              {...register("answer")}
              placeholder="Details of whole day Plan"
              className="textarea textarea-bordered w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleAddFaq}
            className="btn btn-accent my-2"
          >
            ➕ Add
          </button>

          {/* ✅ FAQ Preview */}
          {faqList.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Added FAQs:</h3>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                {faqList.map((faq, index) => (
                  <li key={index}>
                    <strong>Q:</strong> {faq.question} <br />
                    <strong>A:</strong> {faq.answer}
                    <button
                      onClick={() => handleRemoveFaq(index)}
                      type="button"
                      className="btn btn-xs btn-error ml-2"
                    >
                      ✕ Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ✅ Guide Select */}
        <Select
          isMulti
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
        <input type="hidden" {...register("guideIds", { required: true })} />

        {/* ✅ Images */}
        <div>
          <p className="font-medium mb-2">Current Images:</p>
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative">
                <img
                  src={url}
                  alt={`uploaded-${idx}`}
                  className="rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-1 right-1 btn btn-xs btn-error"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
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

        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={uploading}
        >
          Submit Tour Package
        </button>
      </form>
    </div>
  );
};

export default AddTourPackage;
