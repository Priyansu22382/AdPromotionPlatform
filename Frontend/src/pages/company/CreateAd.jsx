import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const CreateAd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    adTitle: "",
    adImage: "",
    durationInDays: "",
    totalVehicles: "",
    pricePerVehicle: "",
    totalAmount: "",
    description: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "pricePerVehicle" || name === "totalVehicles") {
      const totalAmount =
        name === "pricePerVehicle"
          ? value * form.totalVehicles
          : form.pricePerVehicle * value;

      setForm((prev) => ({
        ...prev,
        totalAmount,
      }));
    }
  };

  // Convert file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        adImage: reader.result,
      }));
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const {
      adTitle,
      adImage,
      durationInDays,
      totalVehicles,
      pricePerVehicle,
      totalAmount,
      description,
    } = form;

    if (
      !adTitle ||
      !adImage ||
      !durationInDays ||
      !totalVehicles ||
      !pricePerVehicle ||
      !totalAmount ||
      !description
    ) {
      setErrorMsg("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/ad/createAd", form);
      setSuccessMsg("Ad created successfully!");
      setForm({
        adTitle: "",
        adImage: "",
        durationInDays: "",
        totalVehicles: "",
        pricePerVehicle: "",
        totalAmount: "",
        description: "",
      });
      setPreviewImage(null);
      setTimeout(() => {
        navigate("/company/");
      }, 1500);
    } catch (err) {
      console.error("Create ad error:", err);
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">📢 Create New Ad</h2>

      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="adTitle"
          placeholder="Ad Title"
          value={form.adTitle}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Ad Description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>

        <input
          type="number"
          name="durationInDays"
          placeholder="Duration in Days"
          value={form.durationInDays}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="totalVehicles"
          placeholder="Total Vehicles Required"
          value={form.totalVehicles}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="pricePerVehicle"
          placeholder="Price per Vehicle"
          value={form.pricePerVehicle}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount (Auto-calculated)"
          value={form.totalAmount}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />

        <div>
          <label className="block mb-1">Upload Ad Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-3 h-40 rounded object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Create Ad"}
        </button>
      </form>
    </div>
  );
};

export default CreateAd;
