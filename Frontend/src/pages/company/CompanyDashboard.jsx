import { useEffect, useState } from "react";// ✅ Axios instance
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const CompanyDashboard = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axiosInstance.get("/ad/getCompanyAd");
        setAds(res.data);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };

    fetchAds();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/company/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="text-gray-800 bg-gray-50 min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Welcome to the Company Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your ad campaigns, track performance, and connect with cab drivers.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Grid for Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link to="/company/create-ad" className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
          <h2 className="text-lg font-medium">📢 Create New Ad</h2>
          <p className="text-sm text-gray-500 mt-2">
            Publish a new ad campaign and choose your target city, budget, and vehicle type.
          </p>
        </Link>

        <Link to="/company/ads" className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
          <h2 className="text-lg font-medium">📂 View My Ads</h2>
          <p className="text-sm text-gray-500 mt-2">
            Check all ads you've created, their current status, and edit or delete them.
          </p>
        </Link>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-medium">📊 Engagement Stats</h2>
          <p className="text-sm text-gray-500 mt-2">
            Total Views: <span className="font-semibold text-blue-600">12,340</span><br />
            Clicks: <span className="font-semibold text-blue-600">3,210</span><br />
            Active Ads: <span className="font-semibold text-blue-600">{ads.filter(ad => ad.status === "Approved").length}</span>
          </p>
        </div>
      </div>

      {/* Assigned Drivers */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">🚗 Assigned Cab Drivers</h2>

        {ads.filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0).length === 0 ? (
          <p className="text-gray-600">No assigned cab drivers yet.</p>
        ) : (
          ads
            .filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0)
            .map((ad, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-md font-semibold mb-2">📌 Ad: {ad.adTitle}</h3>
                <ul className="bg-white rounded-xl shadow divide-y">
                  {ad.assignedDrivers.map((driver, idx) => (
                    <li key={idx} className="p-4 flex justify-between items-center">
                      <span>
                        <strong>Driver:</strong> {driver.name}<br />
                        <strong>Vehicle:</strong> {driver.vehicleNumber} ({driver.platform})
                      </span>
                      <span className={`font-medium ${driver.isAvailable ? "text-green-600" : "text-yellow-600"}`}>
                        {driver.isAvailable ? "Active" : "Assigned"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
