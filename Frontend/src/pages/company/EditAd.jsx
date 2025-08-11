import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    adTitle: "",
    description: "",
    durationInDays: "",
    totalVehicles: "",
    pricePerVehicle: "",
    totalAmount: "",
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch ad details
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axiosInstance.get(`/ad/getCompanyAd`);
        const adToEdit = res.data.find((ad) => ad._id === id);

        if (!adToEdit) {
          setErrorMsg("Ad not found.");
        } else if (adToEdit.status !== "Pending") {
          setErrorMsg("Only pending ads can be edited.");
        } else {
          setForm({
            adTitle: adToEdit.adTitle,
            description: adToEdit.description,
            durationInDays: adToEdit.durationInDays,
            totalVehicles: adToEdit.totalVehicles,
            pricePerVehicle: adToEdit.pricePerVehicle,
            totalAmount: adToEdit.totalAmount,
          });
        }
      } catch (err) {
        console.error("Error fetching ad:", err);
        setErrorMsg("Failed to fetch ad data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  // Automatically update totalAmount
  useEffect(() => {
    const vehicles = parseInt(form.totalVehicles);
    const price = parseFloat(form.pricePerVehicle);

    if (!isNaN(vehicles) && !isNaN(price)) {
      setForm((prev) => ({
        ...prev,
        totalAmount: vehicles * price,
      }));
    }
  }, [form.totalVehicles, form.pricePerVehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.put(`/ad/${id}`, form);
      console.log("Updated:", res.data);
      navigate("/company/ads");
    } catch (err) {
      console.error("Update error:", err);
      setErrorMsg("Failed to update the ad.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">✏️ Edit Ad</h2>

      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

      {!errorMsg && (
        <form
          onSubmit={handleUpdate}
          className="bg-white rounded-xl shadow p-6 max-w-xl space-y-4"
        >
          <div>
            <label className="block font-medium mb-1">Ad Title</label>
            <input
              type="text"
              name="adTitle"
              value={form.adTitle}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Duration (Days)</label>
              <input
                type="number"
                name="durationInDays"
                value={form.durationInDays}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Vehicles</label>
              <input
                type="number"
                name="totalVehicles"
                value={form.totalVehicles}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Price / Vehicle (₹)</label>
              <input
                type="number"
                name="pricePerVehicle"
                value={form.pricePerVehicle}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Total Amount (₹)</label>
              <input
                type="number"
                name="totalAmount"
                value={form.totalAmount}
                readOnly
                className="w-full border bg-gray-100 text-gray-600 rounded p-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Ad
          </button>
        </form>
      )}
    </div>
  );
};

export default EditAd;
