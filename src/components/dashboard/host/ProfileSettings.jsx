import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProfileSettings() {
  const [hostData, setHostData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    propertiesManaged: 5,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHostData({ ...hostData, [name]: value });
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={hostData.name}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={hostData.email}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Properties Managed</label>
          <input
            type="number"
            name="propertiesManaged"
            value={hostData.propertiesManaged}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            readOnly
          />
        </div>
        <button
          onClick={handleSave}
          className="btn btn-primary"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 