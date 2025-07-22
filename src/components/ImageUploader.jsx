import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ imageUrls, setImageUrls, onImageRemove, canRemove = true }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
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
        console.error("Image upload failed:", err);
      }
    }

    setImageUrls(prev => [...prev, ...uploaded]);
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="file-input file-input-bordered w-full"
      />

      {uploading && <p className="text-blue-500 text-sm">Uploading images...</p>}

      {imageUrls?.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="relative">
              <img src={url} alt={`uploaded-${idx}`} className="rounded shadow" />
              {canRemove && (
                <button
                  type="button"
                  onClick={() => onImageRemove?.(url)}
                  className="absolute top-1 right-1 btn btn-xs btn-error"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;



