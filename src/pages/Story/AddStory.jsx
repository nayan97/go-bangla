import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddStory = () => {
  const { register, handleSubmit, reset } = useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    setUploading(true);
    const urls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
        formData
      );

      urls.push(res.data.data.url);
    }

    setImageUrls(urls);
    setUploading(false);
  };

  const onSubmit = async (data) => {
    const storyData = {
      ...data,
      imageUrls,
      userEmail: "user@example.com", // replace with auth email
    };

    try {
      await axios.post('/api/stories', storyData);
      reset();
      setImageUrls([]);
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

        <input
          type="file"
          multiple
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleImageUpload}
        />

        {uploading && <p className="text-blue-500 text-sm">Uploading images...</p>}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((url, idx) => (
              <img key={idx} src={url} alt="uploaded" className="rounded-lg" />
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
