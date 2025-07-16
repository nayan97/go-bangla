import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddStory = () => {
         const axiosSecure = useAxiosSecure();
     
      const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

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
    const storyData = {
      ...data,
      imageUrls,
    };

    try {
      await axiosSecure.post('/api/stories', storyData);
      reset();
      setImageUrls([])
      Swal.fire("Success!", "Story created successfully!", "success");
      navigate('/dashboard/manage-stories');
    } catch (err) {
      console.error("Failed to submit story", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Add a Story</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <input
          {...register("email", { required: true })}
          type="text"
            value={user.email}
          className="input input-bordered w-full bg-[#ddd] focus:outline-none"
          readOnly
        />
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Story Title"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("content", { required: true })}
          placeholder="Write your story..."
          className="textarea textarea-bordered w-full h-40"
        ></textarea>

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

        <button className="btn btn-primary w-full" type="submit" disabled={uploading}>
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default AddStory;
