
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const AdminDashboard = () => {
  const [ads, setAds] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [modalDriverTitle, setModalDriverTitle] = useState("");
  const [modalDriverData, setModalDriverData] = useState([]);

  useEffect(() => {
    fetchAllAds();
    fetchDrivers();
  }, []);

  const fetchAllAds = async () => {
    try {
      const res = await axiosInstance.get("/ad/admin/allAds");
      setAds(res.data);
    } catch (err) {
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await axiosInstance.get("/auth/admin/cab-driver/all");
      setDrivers(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  const handleApprove = (ad) => {
    setSelectedAd(ad);
    setSelectedDrivers([]);
    setIsModalOpen(true);
  };

  const confirmApproveAndAssign = async () => {
    if (selectedDrivers.length !== selectedAd.totalVehicles) {
      alert(`Please select exactly ${selectedAd.totalVehicles} drivers.`);
      return;
    }

    try {
      await axiosInstance.put("/ad/admin/approve-assign", {
        adId: selectedAd._id,
        driverIds: selectedDrivers
      });
      setIsModalOpen(false);
      fetchAllAds();
      fetchDrivers();
    } catch (err) {
      console.error("Error assigning drivers:", err);
    }
  };

  const handleReject = async (adId) => {
    try {
      await axiosInstance.put(`/ad/admin/reject/${adId}`);
      fetchAllAds();
    } catch (err) {
      console.error("Error rejecting ad:", err);
    }
  };

  const handleDelete = async (adId) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      await axiosInstance.delete(`/auth/admin/delete-ad/${adId}`);
      fetchAllAds();
    } catch (err) {
      console.error("Error deleting ad:", err);
    }
  };

  const toggleDriverSelection = (driverId) => {
    setSelectedDrivers((prev) =>
      prev.includes(driverId)
        ? prev.filter((id) => id !== driverId)
        : [...prev, driverId]
    );
  };

  const availableDrivers = drivers.filter((d) => d.isAvailable);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🛠️ Admin Dashboard</h1>

      {/* Driver Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer"
          onClick={() => {
            setModalDriverTitle("All Cab Drivers");
            setModalDriverData(drivers);
            setDriverModalOpen(true);
          }}
        >
          <h2 className="text-gray-700 font-semibold mb-1">Total Cab Drivers</h2>
          <p className="text-2xl font-bold text-gray-900">{drivers.length}</p>
        </div>
        <div
          className="bg-green-50 shadow-md rounded-lg p-4 border border-green-200 cursor-pointer"
          onClick={() => {
            setModalDriverTitle("Available Cab Drivers");
            setModalDriverData(availableDrivers);
            setDriverModalOpen(true);
          }}
        >
          <h2 className="text-green-700 font-semibold mb-1">Available</h2>
          <p className="text-2xl font-bold text-green-800">{availableDrivers.length}</p>
        </div>
        <div
          className="bg-red-50 shadow-md rounded-lg p-4 border border-red-200 cursor-pointer"
          onClick={() => {
            setModalDriverTitle("Unavailable Cab Drivers");
            setModalDriverData(drivers.filter((d) => !d.isAvailable));
            setDriverModalOpen(true);
          }}
        >
          <h2 className="text-red-700 font-semibold mb-1">Not Available</h2>
          <p className="text-2xl font-bold text-red-800">{drivers.length - availableDrivers.length}</p>
        </div>
      </div>

      {/* Ads Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📢 Ad Requests</h2>

      {loading ? (
        <p className="text-gray-500">Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-gray-500">No ads submitted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((ad) => {
            const startDate = new Date(ad.createdAt);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + ad.durationInDays);

            return (
              <div key={ad._id} className="bg-white shadow-sm rounded-lg p-5 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{ad.adTitle}</h3>
                    <span
                      className={`text-sm font-medium ${
                        ad.status === "Pending"
                          ? "text-yellow-600"
                          : ad.status === "Approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </div>
                  <img
                    src={ad.adImage}
                    alt="Ad"
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                </div>

                <p className="text-sm text-gray-600 mb-3">{ad.description}</p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Company:</strong> {ad.company?.companyName}</p>
                  <p><strong>Email:</strong> {ad.company?.email}</p>
                  <p><strong>Vehicles Needed:</strong> {ad.totalVehicles}</p>
                  <p><strong>Price/Vehicle:</strong> ₹{ad.pricePerVehicle}</p>
                  <p><strong>Total:</strong> ₹{ad.totalAmount}</p>
                  <p><strong>Start Date:</strong> {startDate.toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {endDate.toLocaleDateString()}</p>
                </div>

                {ad.status === "Pending" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleApprove(ad)}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleReject(ad._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}

                {ad.status === "Rejected" && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}

                {ad.status === "Approved" && ad.assignedDrivers?.length > 0 && (
                  <div className="mt-4 text-sm">
                    <strong>Assigned Drivers:</strong>
                    <ul className="list-disc pl-6 mt-1 text-gray-700">
                      {ad.assignedDrivers.map((driver) => (
                        <li key={driver._id}>
                          {driver.name} — {driver.vehicleNumber} ({driver.platform})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Approving and Assigning Drivers */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Assign Drivers to: {selectedAd.adTitle}</h2>

            <p className="mb-2 text-sm text-gray-600">
              Select exactly {selectedAd.totalVehicles} available drivers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto mb-4">
              {availableDrivers.map((driver) => (
                <label
                  key={driver._id}
                  className={`p-3 border rounded cursor-pointer flex justify-between items-center ${
                    selectedDrivers.includes(driver._id) ? "bg-blue-100 border-blue-400" : ""
                  }`}
                >
                  <span>
                    {driver.name} — {driver.vehicleNumber} ({driver.platform})
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedDrivers.includes(driver._id)}
                    onChange={() => toggleDriverSelection(driver._id)}
                  />
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmApproveAndAssign}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Driver Lists */}
      {driverModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{modalDriverTitle}</h2>
            {modalDriverData.length === 0 ? (
              <p className="text-gray-500">No drivers found.</p>
            ) : (
              <ul className="space-y-3 max-h-80 overflow-y-auto text-sm">
                {modalDriverData.map((driver) => (
                  <li key={driver._id} className="border-b pb-2">
                    <strong>{driver.name}</strong><br />
                    Email: {driver.email}<br />
                    Vehicle: {driver.vehicleNumber}<br />
                    Platform: {driver.platform}
                  </li>
                ))}
              </ul>
            )}
            <div className="text-right mt-4">
              <button
                onClick={() => setDriverModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
