// import { useEffect, useState } from "react";// ✅ Axios instance
// import { Link, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../lib/axios";

// const CompanyDashboard = () => {
//   const [ads, setAds] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const res = await axiosInstance.get("/ad/getCompanyAd");
//         setAds(res.data);
//       } catch (err) {
//         console.error("Error fetching ads:", err);
//       }
//     };

//     fetchAds();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axiosInstance.post("/auth/company/logout", {}, { withCredentials: true });
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <div className="text-gray-800 bg-gray-50 min-h-screen p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold">Welcome to the Company Dashboard</h1>
//           <p className="mt-2 text-gray-600">
//             Manage your ad campaigns, track performance, and connect with cab drivers.
//           </p>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Grid for Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         <Link to="/company/create-ad" className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
//           <h2 className="text-lg font-medium">📢 Create New Ad</h2>
//           <p className="text-sm text-gray-500 mt-2">
//             Publish a new ad campaign and choose your target city, budget, and vehicle type.
//           </p>
//         </Link>

//         <Link to="/company/ads" className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
//           <h2 className="text-lg font-medium">📂 View My Ads</h2>
//           <p className="text-sm text-gray-500 mt-2">
//             Check all ads you've created, their current status, and edit or delete them.
//           </p>
//         </Link>

//         <div className="bg-white rounded-xl shadow p-5">
//           <h2 className="text-lg font-medium">📊 Engagement Stats</h2>
//           <p className="text-sm text-gray-500 mt-2">
//             Total Views: <span className="font-semibold text-blue-600">12,340</span><br />
//             Clicks: <span className="font-semibold text-blue-600">3,210</span><br />
//             Active Ads: <span className="font-semibold text-blue-600">{ads.filter(ad => ad.status === "Approved").length}</span>
//           </p>
//         </div>
//       </div>

//       {/* Assigned Drivers */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold mb-4">🚗 Assigned Cab Drivers</h2>

//         {ads.filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0).length === 0 ? (
//           <p className="text-gray-600">No assigned cab drivers yet.</p>
//         ) : (
//           ads
//             .filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0)
//             .map((ad, index) => (
//               <div key={index} className="mb-6">
//                 <h3 className="text-md font-semibold mb-2">📌 Ad: {ad.adTitle}</h3>
//                 <ul className="bg-white rounded-xl shadow divide-y">
//                   {ad.assignedDrivers.map((driver, idx) => (
//                     <li key={idx} className="p-4 flex justify-between items-center">
//                       <span>
//                         <strong>Driver:</strong> {driver.name}<br />
//                         <strong>Vehicle:</strong> {driver.vehicleNumber} ({driver.platform})
//                       </span>
//                       <span className={`font-medium ${driver.isAvailable ? "text-green-600" : "text-yellow-600"}`}>
//                         {driver.isAvailable ? "Active" : "Assigned"}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyDashboard;


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { PlusCircle, FileText, BarChart2, LogOut, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-black text-gray-200">
      {/* Animated background overlay */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
      {/* Dashboard content */}
      <div className="z-10 w-full max-w-5xl">
        <header className="flex justify-between items-center mb-10 p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-purple-900/50">
              <ShieldCheck size={32} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">Company Dashboard</h1>
              <p className="mt-1 text-gray-400">
                Manage your ad campaigns and connect with cab drivers.
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-900/70 active:scale-95"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </header>

        {/* Grid for Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Create Ad Card */}
          <Link
            to="/company/create-ad"
            className="bg-gray-800/60 rounded-xl border border-gray-700 p-6 shadow-lg shadow-purple-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-900/70"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Create New Ad</h2>
              <PlusCircle className="text-purple-400" size={24} />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Publish a new ad campaign and choose your target city, budget, and vehicle type.
            </p>
          </Link>

          {/* View Ads Card */}
          <Link
            to="/company/ads"
            className="bg-gray-800/60 rounded-xl border border-gray-700 p-6 shadow-lg shadow-purple-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-900/70"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">View My Ads</h2>
              <FileText className="text-purple-400" size={24} />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Check all ads you've created, their current status, and edit or delete them.
            </p>
          </Link>

          {/* Engagement Stats Card */}
          <div className="bg-gray-800/60 rounded-xl border border-gray-700 p-6 shadow-lg shadow-purple-900/50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Engagement Stats</h2>
              <BarChart2 className="text-purple-400" size={24} />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Total Views: <span className="font-semibold text-purple-400">12,340</span><br />
              Clicks: <span className="font-semibold text-purple-400">3,210</span><br />
              Active Ads: <span className="font-semibold text-purple-400">{ads.filter(ad => ad.status === "Approved").length}</span>
            </p>
          </div>
        </div>

        {/* Assigned Drivers */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-white">🚗 Assigned Cab Drivers</h2>
          {ads.filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0).length === 0 ? (
            <p className="text-gray-400">No assigned cab drivers yet.</p>
          ) : (
            ads
              .filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0)
              .map((ad, index) => (
                <div key={index} className="mb-6 bg-gray-800/60 rounded-xl shadow-lg shadow-purple-900/50 border border-gray-700 p-4 transition-all duration-300 hover:scale-[1.01]">
                  <h3 className="text-md font-semibold mb-2 text-white">📌 Ad: {ad.adTitle}</h3>
                  <ul className="divide-y divide-gray-700">
                    {ad.assignedDrivers.map((driver, idx) => (
                      <li key={idx} className="py-3 flex justify-between items-center">
                        <div>
                          <strong>Driver:</strong> {driver.name}<br />
                          <strong>Vehicle:</strong> {driver.vehicleNumber} ({driver.platform})
                        </div>
                        <span className={`font-medium ${driver.isAvailable ? "text-green-400" : "text-yellow-400"}`}>
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
    </div>
  );
};

export default CompanyDashboard;
