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
import { PlusCircle, FileText, BarChart2, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-950 to-black text-gray-200">
      {/* Animated background overlay */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      {/* Main Content */}
      <div className="z-10 w-full max-w-5xl">
        <header className="flex justify-between items-center mb-10 p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-400 shadow-lg shadow-teal-900/50">
              <ShieldCheck size={32} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">Welcome Back</h1>
              <p className="mt-1 text-gray-400">
                Manage your ad campaigns and connect with cab drivers.
              </p>
            </div>
          </div>
        </header>

        {/* Action and Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Create Ad Card */}
          <Link
            to="/company/create-ad"
            className="group bg-gray-900/50 rounded-2xl border border-gray-800 p-8 shadow-xl shadow-gray-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-900/50"
          >
            <PlusCircle className="text-teal-400 group-hover:text-white transition-colors" size={32} />
            <h2 className="text-xl font-bold text-white mt-4">Create New Ad</h2>
            <p className="text-sm text-gray-400 mt-2">
              Publish a new ad campaign with custom budget, city, and vehicle types.
            </p>
          </Link>

          {/* View Ads Card */}
          <Link
            to="/company/ads"
            className="group bg-gray-900/50 rounded-2xl border border-gray-800 p-8 shadow-xl shadow-gray-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-900/50"
          >
            <FileText className="text-teal-400 group-hover:text-white transition-colors" size={32} />
            <h2 className="text-xl font-bold text-white mt-4">View My Ads</h2>
            <p className="text-sm text-gray-400 mt-2">
              Check all ads you've created, their current status, and edit or delete them.
            </p>
          </Link>

          {/* Engagement Stats Card */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 shadow-xl shadow-gray-950/50">
            <BarChart2 className="text-teal-400" size={32} />
            <h2 className="text-xl font-bold text-white mt-4">Engagement Stats</h2>
            <p className="text-sm text-gray-400 mt-2">
              Total Views: <span className="font-semibold text-teal-400">12,340</span><br />
              Clicks: <span className="font-semibold text-teal-400">3,210</span><br />
              Active Ads: <span className="font-semibold text-teal-400">{ads.filter(ad => ad.status === "Approved").length}</span>
            </p>
          </div>
        </div>

        {/* Assigned Drivers */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">🚗 Assigned Cab Drivers</h2>
          {ads.filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0).length === 0 ? (
            <div className="p-8 bg-gray-900/50 rounded-2xl text-center border border-gray-800">
                <p className="text-gray-400 text-lg">No assigned cab drivers yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
                {ads
                .filter(ad => ad.status === "Approved" && ad.assignedDrivers.length > 0)
                .map((ad, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-2xl shadow-xl shadow-gray-950/50 border border-gray-800 p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-teal-900/50">
                    <h3 className="text-lg font-bold text-teal-400 mb-3">📌 Ad: {ad.adTitle}</h3>
                    <ul className="divide-y divide-gray-800">
                        {ad.assignedDrivers.map((driver, idx) => (
                        <li key={idx} className="py-3 flex justify-between items-center">
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
