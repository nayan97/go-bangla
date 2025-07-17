import { useState } from 'react';
import axios from 'axios';

const EditProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    photoURL: user?.photoURL || '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.email}`, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });
      alert("Profile updated!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#ddd] bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />
          <input
            type="text"
            disabled
            value={user?.email}
            className="input input-bordered w-full bg-gray-100"
            placeholder="Email"
          />
          <input
            type="text"
            disabled
            value="Admin"
            className="input input-bordered w-full bg-gray-200"
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-[#ddd]" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
