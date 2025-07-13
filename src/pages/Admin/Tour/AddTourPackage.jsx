import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const AddTourPackage = () => {
  const axiosdata = useAxiosSecure();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axiosdata
      .get("/api/guides") // adjust this route as needed
      .then((res) => {
        const activeGuides = res.data.filter(
          (guide) => guide.status === "active"
        );
        setGuides(activeGuides);
      })
      .catch((err) => {
        console.error("Error fetching guides:", err);
      });
  }, []);

  const { register, handleSubmit, reset } = useForm();
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

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

    // ✅ Append new uploaded images to existing list
    setImageUrls((prev) => [...prev, ...uploaded]);
    setUploading(false);
  };

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      about: data.about,
      plan: data.plan,
      price: data.price,
      guideIds: data.guideIds, // array of selected emails
      images: imageUrls,
    };
    console.log(imageUrls);

    try {
      const res = await axiosdata.post("/api/packages", payload);
      Swal.fire(
        "Success!",
        "Tour pakage added successfully.",
        "success"
      );
      reset();
      setImageUrls([]);
      //   console.log(res);
    } catch (error) {
      console.error("Error saving package:", error);
      Swal.fire("Error", "Something went wrong while approving.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add Tour Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Tour Title"
          className="input input-bordered w-full"
        />
        {/* Price*/}
        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Tour package price"
          className="input input-bordered w-full"
        />

        {/* About Section */}
        <textarea
          {...register("about", { required: true })}
          placeholder="About the Tour"
          className="textarea textarea-bordered w-full"
          rows={4}
        />

        {/* Accordion (Tour Plan) */}
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Tour Plan (Day by Day)
          </div>
          <div className="collapse-content">
            <textarea
              {...register("plan", { required: true })}
              placeholder={`Day 1: Arrival\nDay 2: City Tour\nDay 3: Beach Trip`}
              className="textarea textarea-bordered w-full"
              rows={6}
            />
          </div>
        </div>

        {/* Guide IDs */}
        <select
          {...register("guideIds", { required: true })}
          defaultValue=""
          className="select w-full"
        >
          <option value="" disabled>
            Pick a Tour Guide
          </option>
          {guides.map((guide) => (
            <option key={guide._id} value={guide.email}>
              {guide.name}
            </option>
          ))}
        </select>

        {/* Multiple Image Upload */}
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
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Uploaded ${idx}`}
                className="rounded shadow"
              />
            ))}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddTourPackage;
