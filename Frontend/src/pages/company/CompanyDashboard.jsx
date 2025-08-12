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
import { PlusCircle, FileText, BarChart2, ShieldCheck, Layers, Car, Tags, CalendarDays } from "lucide-react";

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

  return (
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-black text-gray-200 font-sans">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-20" />

      {/* Main Content Container */}
      <div className="z-10 w-full max-w-6xl px-4 md:px-8 py-10">
        <header className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="flex items-center space-x-5 mb-6 md:mb-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-400/20 text-teal-400 shadow-xl shadow-teal-900/40">
              <ShieldCheck size={40} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-md">Welcome Back!</h1>
              <p className="mt-2 text-gray-400 text-lg">
                Your ad campaign management hub.
              </p>
            </div>
          </div>
        </header>

        {/* Action and Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Create Ad Card */}
          <Link
            to="/company/create-ad"
            className="group relative overflow-hidden bg-gray-800/80 rounded-3xl border border-gray-700 p-8 shadow-2xl shadow-gray-950/50 transition-all duration-500 transform hover:scale-105 hover:shadow-teal-900/60"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
            <div className="relative z-10">
              <PlusCircle className="text-teal-400 group-hover:text-white transition-colors duration-300" size={36} />
              <h2 className="text-2xl font-bold text-white mt-5">Create New Ad</h2>
              <p className="text-sm text-gray-400 mt-2">
                Publish a new ad campaign with a custom budget and vehicle type.
              </p>
            </div>
          </Link>

          {/* View Ads Card */}
          <Link
            to="/company/ads"
            className="group relative overflow-hidden bg-gray-800/80 rounded-3xl border border-gray-700 p-8 shadow-2xl shadow-gray-950/50 transition-all duration-500 transform hover:scale-105 hover:shadow-teal-900/60"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
            <div className="relative z-10">
              <FileText className="text-teal-400 group-hover:text-white transition-colors duration-300" size={36} />
              <h2 className="text-2xl font-bold text-white mt-5">View My Ads</h2>
              <p className="text-sm text-gray-400 mt-2">
                Check all your created ads, their current status, and manage them.
              </p>
            </div>
          </Link>

          {/* Engagement Stats Card */}
          <div className="group relative overflow-hidden bg-gray-800/80 rounded-3xl border border-gray-700 p-8 shadow-2xl shadow-gray-950/50">
            <div className="relative z-10">
              <BarChart2 className="text-teal-400" size={36} />
              <h2 className="text-2xl font-bold text-white mt-5">Engagement Stats</h2>
              <p className="text-sm text-gray-400 mt-2 space-y-1">
                <span className="flex items-center space-x-2">
                  <Tags size={16} /> <span className="font-semibold text-teal-400">Total Views:</span> 12,340
                </span>
                <span className="flex items-center space-x-2">
                  <PlusCircle size={16} /> <span className="font-semibold text-teal-400">Clicks:</span> 3,210
                </span>
                <span className="flex items-center space-x-2">
                  <CalendarDays size={16} /> <span className="font-semibold text-teal-400">Active Ads:</span> {ads.filter(ad => ad.status === "Approved").length}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Assigned Drivers Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">🚗 Assigned Cab Drivers</h2>
          {ads.filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0).length === 0 ? (
            <div className="p-8 bg-gray-800/80 rounded-2xl text-center border border-gray-700 shadow-lg">
                <p className="text-gray-400 text-lg">No assigned cab drivers yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
                {ads
                .filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0)
                .map((ad, index) => (
                    <div key={index} className="bg-gray-800/80 rounded-2xl shadow-xl shadow-gray-950/50 border border-gray-700 p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-teal-900/50">
                    <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center space-x-2">
                      <Car size={20} />
                      <span>Ad: {ad.adTitle}</span>
                    </h3>
                    <ul className="divide-y divide-gray-700">
                        {ad.assignedDrivers.map((driver, idx) => (
                        <li key={idx} className="py-4 flex justify-between items-center">
                            <div>
                            <p className="font-semibold text-white">Driver: <span className="font-normal text-gray-300">{driver.name}</span></p>
                            <p className="text-sm text-gray-400">Vehicle: {driver.vehicleNumber} ({driver.platform})</p>
                            </div>
                            <span className={`font-medium px-3 py-1 rounded-full text-xs ${driver.isAvailable ? "bg-green-600/30 text-green-400" : "bg-yellow-600/30 text-yellow-400"}`}>
                            {driver.isAvailable ? "Active" : "Assigned"}
                            </span>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;

