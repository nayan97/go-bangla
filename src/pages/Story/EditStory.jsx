import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditStory = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Fetch story by ID
  useEffect(() => {
    axiosSecure.get(`/api/stories/id/${id}`).then((res) => {
      const story = res.data;
      setValue('title', story.title);
      setValue('content', story.content);
      setValue('email', story.userEmail);
      setImageUrls(story.imageUrls || []);
      console.log(res);
    });
  }, [id, axiosSecure, setValue]);


  
  // 🔹 Upload new images and store them temporarily
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    setUploading(true);

    const uploaded = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
          formData
        );
        uploaded.push(res.data.data.url);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    // Push new images to DB
    if (uploaded.length) {
      await axiosSecure.patch(`/api/stories/${id}`, {
        newImages: uploaded,
      });
      setImageUrls((prev) => [...prev, ...uploaded]);
    }

    setUploading(false);
  };

  // 🔹 Remove image from DB and local state
  const handleRemoveImage = async (urlToRemove) => {
    try {
      await axiosSecure.patch(`/api/stories/${id}`, {
        removeImage: urlToRemove,
      });
      setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
    } catch (error) {
      console.error("Failed to remove image:", error);
    }
  };

  // 🔹 Submit updated title/content
  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/api/stories/${id}`, {
        title: data.title,
        content: data.content,
      });
      Swal.fire("Success", "Story updated successfully!", "success");
      navigate('/dashboard/manage-stories');
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Edit Story</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
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

        <div>
          <p className="font-medium mb-2">Current Images:</p>
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative">
                <img src={url} alt={`uploaded-${idx}`} className="rounded shadow" />
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

        {/* Upload New Images */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input file-input-bordered w-full mt-4"
        />
        {uploading && <p className="text-blue-500 text-sm">Uploading new images...</p>}

        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={uploading}
        >
          Update Story
        </button>
      </form>
    </div>
  );
};

export default EditStory;
