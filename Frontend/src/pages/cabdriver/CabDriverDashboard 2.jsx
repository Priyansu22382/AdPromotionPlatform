import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

const CabDriverDashboard = () => {
  const [assignedAds, setAssignedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cabDriver, setCabDriver] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);
  const navigate = useNavigate();
  const pdfRef = useRef();

  useEffect(() => {
    fetchCabDriverData();
    fetchAssignedAds();
  }, []);

  const fetchCabDriverData = async () => {
    try {
      const res = await axiosInstance.get("/auth/cab-driver/check-Auth", { withCredentials: true });
      setCabDriver(res.data);
    } catch (err) {
      console.error("Auth error", err);
      navigate("/login");
    }
  };

  const fetchAssignedAds = async () => {
    try {
      const res = await axiosInstance.get("/ad/cabdriver/assigned-ads", { withCredentials: true });
      setAssignedAds(res.data);
    } catch (err) {
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    try {
      const res = await axiosInstance.patch("/auth/cab-driver/toggle-availability", {}, { withCredentials: true });
      setCabDriver(prev => ({ ...prev, isAvailable: res.data.isAvailable }));
    } catch (err) {
      console.error("Error toggling availability", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/cab-driver/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const downloadPDF = () => {
    const image = pdfRef.current.querySelector("img");

    if (image && !image.complete) {
      image.onload = () => generatePDF();
    } else {
      generatePDF();
    }
  };

  const generatePDF = () => {
    html2pdf(pdfRef.current, {
      margin: 10,
      filename: `${selectedAd.adTitle.replace(/\s+/g, "-")}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">🚕 Cab Driver Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* Driver Info */}
      {cabDriver && (
        <div className="mb-6 bg-white shadow p-4 rounded">
          <p><strong>Name:</strong> {cabDriver.name}</p>
          <p><strong>Email:</strong> {cabDriver.email}</p>
          <p><strong>Contact Number:</strong> {cabDriver.phoneNumber}</p>
          <p><strong>Vehicle Number:</strong> {cabDriver.vehicleNumber}</p>
          <p><strong>Platform:</strong> {cabDriver.platform}</p>
          <div className="mt-3">
            <span className="mr-2 font-medium">Availability:</span>
            <button
              onClick={toggleAvailability}
              className={`px-4 py-1 rounded text-white ${
                cabDriver.isAvailable ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {cabDriver.isAvailable ? "Available (Click to Mark Unavailable)" : "Not Available (Click to Mark Available)"}
            </button>
          </div>
        </div>
      )}

      {/* Assigned Ads */}
      <h2 className="text-xl font-semibold text-gray-700 mb-3">📦 Assigned Ads</h2>

      {loading ? (
        <p>Loading assigned ads...</p>
      ) : assignedAds.length === 0 ? (
        <p>No ads assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {assignedAds.map(ad => (
            <div key={ad._id} className="bg-white p-4 rounded shadow border cursor-pointer hover:shadow-md transition" onClick={() => setSelectedAd(ad)}>
              <h3 className="text-lg font-bold mb-2">{ad.adTitle}</h3>
              <img src={ad.adImage} alt="Ad" className="w-full h-100 object-cover rounded mb-3" />
              <p>{ad.description.slice(0, 100)}...</p>
              <p><strong>Company:</strong> {ad.company?.companyName}</p>
              <p><strong>Duration:</strong> {ad.durationInDays} days</p>
              <p><strong>Pay:</strong> ₹{ad.pricePerVehicle}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Expanded Ad */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
            <button onClick={() => setSelectedAd(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black">✖</button>
            <div ref={pdfRef} className="max-h-[70vh] overflow-y-auto pr-2">
              <h2 className="text-2xl font-bold mb-2">{selectedAd.adTitle}</h2>
              <img src={selectedAd.adImage} alt="Ad" className="w-[50%] h-[50%] object-cover rounded mb-3" crossOrigin="anonymous" />
              <p className="mb-2">{selectedAd.description}</p>
              <p><strong>Company:</strong> {selectedAd.company?.companyName}</p>
              <p><strong>Duration:</strong> {selectedAd.durationInDays} days</p>
            </div>
            <button
              onClick={downloadPDF}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabDriverDashboard;

