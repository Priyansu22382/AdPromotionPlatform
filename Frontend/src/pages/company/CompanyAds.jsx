// // // import React, { useEffect, useState } from "react";
// // // import { axiosInstance } from "../../lib/axios";

// // // const CompanyAds = () => {
// // //   const [ads, setAds] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [errorMsg, setErrorMsg] = useState("");

// // //   useEffect(() => {
// // //     const fetchCompanyAds = async () => {
// // //       try {
// // //         const res = await axiosInstance.get("/ad/getCompanyAd");
// // //         setAds(res.data);
// // //       } catch (err) {
// // //         console.error("Error fetching company ads:", err);
// // //         setErrorMsg("Failed to load your ads. Please try again.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCompanyAds();
// // //   }, []);

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "Pending":
// // //         return "text-yellow-500";
// // //       case "Approved":
// // //         return "text-green-600";
// // //       case "Rejected":
// // //         return "text-red-500";
// // //       default:
// // //         return "text-gray-500";
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6 bg-gray-50 min-h-screen">
// // //       <h2 className="text-2xl font-semibold mb-4">📂 Your Ad History</h2>

// // //       {loading ? (
// // //         <p>Loading ads...</p>
// // //       ) : errorMsg ? (
// // //         <p className="text-red-500">{errorMsg}</p>
// // //       ) : ads.length === 0 ? (
// // //         <p className="text-gray-600">You haven't created any ads yet.</p>
// // //       ) : (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {ads.map((ad) => (
// // //             <div
// // //               key={ad._id}
// // //               className="bg-white rounded-xl shadow p-4 border border-gray-200"
// // //             >
// // //               <div className="flex items-center justify-between">
// // //                 <h3 className="text-lg font-semibold">{ad.adTitle}</h3>
// // //                 <span className={`text-sm font-medium ${getStatusColor(ad.status)}`}>
// // //                   {ad.status}
// // //                 </span>
// // //               </div>

// // //               <img
// // //                 src={ad.adImage}
// // //                 alt="Ad"
// // //                 className="mt-3 h-48 w-full object-cover rounded-md"
// // //               />

// // //               <p className="text-sm text-gray-600 mt-3">{ad.description}</p>

// // //               <div className="mt-4 text-sm text-gray-700">
// // //                 <p>
// // //                   <strong>Duration:</strong> {ad.durationInDays} days
// // //                 </p>
// // //                 <p>
// // //                   <strong>Vehicles:</strong> {ad.totalVehicles}
// // //                 </p>
// // //                 <p>
// // //                   <strong>Price/Vehicle:</strong> ₹{ad.pricePerVehicle}
// // //                 </p>
// // //                 <p>
// // //                   <strong>Total Amount:</strong> ₹{ad.totalAmount}
// // //                 </p>
// // //               </div>

// // //               {ad.status === "Approved" && ad.assignedDrivers?.length > 0 && (
// // //                 <div className="mt-4">
// // //                   <strong>Assigned Drivers:</strong>
// // //                   <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
// // //                     {ad.assignedDrivers.map((driver) => (
// // //                       <li key={driver._id}>
// // //                         {driver.name} — {driver.vehicleNumber} ({driver.platform})
// // //                       </li>
// // //                     ))}
// // //                   </ul>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CompanyAds;

// // import React, { useEffect, useState } from "react";
// // import { axiosInstance } from "../../lib/axios";
// // import { useNavigate } from "react-router-dom";

// // const CompanyAds = () => {
// //   const [ads, setAds] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [errorMsg, setErrorMsg] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchCompanyAds();
// //   }, []);

// //   const fetchCompanyAds = async () => {
// //     try {
// //       const res = await axiosInstance.get("/ad/getCompanyAd");
// //       setAds(res.data);
// //     } catch (err) {
// //       console.error("Error fetching company ads:", err);
// //       setErrorMsg("Failed to load your ads. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (adId) => {
// //     navigate(`/company/edit-ad/${adId}`);
// //   };

// //   const handleDelete = async (adId) => {
// //     const confirm = window.confirm("Are you sure you want to delete this ad?");
// //     if (!confirm) return;

// //     try {
// //       await axiosInstance.delete(`/ad/${adId}`);
// //       fetchCompanyAds(); // refresh ads after delete
// //     } catch (err) {
// //       console.error("Delete failed:", err);
// //       alert("Error deleting ad.");
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "Pending":
// //         return "text-yellow-500";
// //       case "Approved":
// //         return "text-green-600";
// //       case "Rejected":
// //         return "text-red-500";
// //       default:
// //         return "text-gray-500";
// //     }
// //   };

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <h2 className="text-2xl font-semibold mb-4">📂 Your Ad History</h2>

// //       {loading ? (
// //         <p>Loading ads...</p>
// //       ) : errorMsg ? (
// //         <p className="text-red-500">{errorMsg}</p>
// //       ) : ads.length === 0 ? (
// //         <p className="text-gray-600">You haven't created any ads yet.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {ads.map((ad) => (
// //             <div
// //               key={ad._id}
// //               className="bg-white rounded-xl shadow p-4 border border-gray-200"
// //             >
// //               <div className="flex items-center justify-between">
// //                 <h3 className="text-lg font-semibold">{ad.adTitle}</h3>
// //                 <span className={`text-sm font-medium ${getStatusColor(ad.status)}`}>
// //                   {ad.status}
// //                 </span>
// //               </div>

// //               <img
// //                 src={ad.adImage}
// //                 alt="Ad"
// //                 className="mt-3 h-48 w-full object-cover rounded-md"
// //               />

// //               <p className="text-sm text-gray-600 mt-3">{ad.description}</p>

// //               <div className="mt-4 text-sm text-gray-700">
// //                 <p>
// //                   <strong>Duration:</strong> {ad.durationInDays} days
// //                 </p>
// //                 <p>
// //                   <strong>Vehicles:</strong> {ad.totalVehicles}
// //                 </p>
// //                 <p>
// //                   <strong>Price/Vehicle:</strong> ₹{ad.pricePerVehicle}
// //                 </p>
// //                 <p>
// //                   <strong>Total Amount:</strong> ₹{ad.totalAmount}
// //                 </p>
// //               </div>

// //               {ad.status === "Approved" && ad.assignedDrivers?.length > 0 && (
// //                 <div className="mt-4">
// //                   <strong>Assigned Drivers:</strong>
// //                   <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
// //                     {ad.assignedDrivers.map((driver) => (
// //                       <li key={driver._id}>
// //                         {driver.name} — {driver.vehicleNumber} ({driver.platform})
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}

// //               {ad.status === "Pending" && (
// //                 <div className="mt-4 flex gap-3">
// //                   <button
// //                     onClick={() => handleEdit(ad._id)}
// //                     className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
// //                   >
// //                     ✏️ Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(ad._id)}
// //                     className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
// //                   >
// //                     ❌ Delete
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CompanyAds;




// // import React, { useEffect, useState } from "react";
// // import { axiosInstance } from "../../lib/axios";
// // import { useNavigate } from "react-router-dom";

// // const CompanyAds = () => {
// //   const [ads, setAds] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [errorMsg, setErrorMsg] = useState("");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("All");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchCompanyAds();
// //   }, []);

// //   const fetchCompanyAds = async () => {
// //     try {
// //       const res = await axiosInstance.get("/ad/getCompanyAd");
// //       setAds(res.data);
// //     } catch (err) {
// //       console.error("Error fetching company ads:", err);
// //       setErrorMsg("Failed to load your ads. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (adId) => {
// //     navigate(`/company/edit-ad/${adId}`);
// //   };

// //   const handleDelete = async (adId) => {
// //     const confirm = window.confirm("Are you sure you want to delete this ad?");
// //     if (!confirm) return;

// //     try {
// //       await axiosInstance.delete(`/ad/${adId}`);
// //       fetchCompanyAds(); // refresh ads after delete
// //     } catch (err) {
// //       console.error("Delete failed:", err);
// //       alert("Error deleting ad.");
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "Pending":
// //         return "text-yellow-500";
// //       case "Approved":
// //         return "text-green-600";
// //       case "Rejected":
// //         return "text-red-500";
// //       default:
// //         return "text-gray-500";
// //     }
// //   };

// //   const filteredAds = ads.filter((ad) => {
// //     const matchesSearch = ad.adTitle.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesStatus = statusFilter === "All" || ad.status === statusFilter;
// //     return matchesSearch && matchesStatus;
// //   });

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <h2 className="text-2xl font-semibold mb-4">📂 Your Ad History</h2>

// //       {/* Filters */}
// //       <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
// //         <input
// //           type="text"
// //           placeholder="🔍 Search by title..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="px-4 py-2 border rounded w-full md:w-1/3"
// //         />
// //         <select
// //           value={statusFilter}
// //           onChange={(e) => setStatusFilter(e.target.value)}
// //           className="px-3 py-2 border rounded text-sm w-full md:w-40"
// //         >
// //           <option value="All">All</option>
// //           <option value="Pending">Pending</option>
// //           <option value="Approved">Approved</option>
// //           <option value="Rejected">Rejected</option>
// //         </select>
// //       </div>

// //       {loading ? (
// //         <p>Loading ads...</p>
// //       ) : errorMsg ? (
// //         <p className="text-red-500">{errorMsg}</p>
// //       ) : filteredAds.length === 0 ? (
// //         <p className="text-gray-600">No ads found matching the criteria.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {filteredAds.map((ad) => (
// //             <div
// //               key={ad._id}
// //               className="bg-white rounded-xl shadow p-4 border border-gray-200"
// //             >
// //               <div className="flex items-center justify-between">
// //                 <h3 className="text-lg font-semibold">{ad.adTitle}</h3>
// //                 <span className={`text-sm font-medium ${getStatusColor(ad.status)}`}>
// //                   {ad.status}
// //                 </span>
// //               </div>

// //               <img
// //                 src={ad.adImage}
// //                 alt="Ad"
// //                 className="mt-3 h-48 w-full object-cover rounded-md"
// //               />

// //               <p className="text-sm text-gray-600 mt-3">{ad.description}</p>

// //               <div className="mt-4 text-sm text-gray-700">
// //                 <p>
// //                   <strong>Duration:</strong> {ad.durationInDays} days
// //                 </p>
// //                 <p>
// //                   <strong>Vehicles:</strong> {ad.totalVehicles}
// //                 </p>
// //                 <p>
// //                   <strong>Price/Vehicle:</strong> ₹{ad.pricePerVehicle}
// //                 </p>
// //                 <p>
// //                   <strong>Total Amount:</strong> ₹{ad.totalAmount}
// //                 </p>
// //               </div>

// //               {ad.status === "Approved" && ad.assignedDrivers?.length > 0 && (
// //                 <div className="mt-4">
// //                   <strong>Assigned Drivers:</strong>
// //                   <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
// //                     {ad.assignedDrivers.map((driver) => (
// //                       <li key={driver._id}>
// //                         {driver.name} — {driver.vehicleNumber} ({driver.platform})
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}

// //               {(ad.status === "Pending" || ad.status === "Rejected") && (
// //                 <div className="mt-4 flex gap-3">
// //                   {ad.status === "Pending" && (
// //                     <button
// //                       onClick={() => handleEdit(ad._id)}
// //                       className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
// //                     >
// //                       ✏️ Edit
// //                     </button>
// //                   )}
// //                   <button
// //                     onClick={() => handleDelete(ad._id)}
// //                     className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
// //                   >
// //                     ❌ Delete
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CompanyAds;



// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import { useNavigate } from "react-router-dom";

// const CompanyAds = () => {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCompanyAds();
//   }, []);

//   const fetchCompanyAds = async () => {
//     try {
//       const res = await axiosInstance.get("/ad/getCompanyAd");
//       const updatedAds = res.data.map(ad => {
//         if (ad.status === "Approved") {
//           const createdDate = new Date(ad.createdAt);
//           const expiryDate = new Date(createdDate);
//           expiryDate.setDate(createdDate.getDate() + ad.durationInDays);
//           const today = new Date();
//           if (today > expiryDate) {
//             ad.status = "Completed";
//           }
//         }
//         return ad;
//       });
//       setAds(updatedAds);
//     } catch (err) {
//       console.error("Error fetching company ads:", err);
//       setErrorMsg("Failed to load your ads. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (adId) => {
//     navigate(`/company/edit-ad/${adId}`);
//   };

//   const handleDelete = async (adId) => {
//     const confirm = window.confirm("Are you sure you want to delete this ad?");
//     if (!confirm) return;

//     try {
//       await axiosInstance.delete(`/ad/${adId}`);
//       fetchCompanyAds(); // Refresh ads
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Error deleting ad.");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "text-yellow-500";
//       case "Approved":
//         return "text-green-600";
//       case "Rejected":
//         return "text-red-500";
//       case "Completed":
//         return "text-blue-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   const filteredAds = ads.filter((ad) => {
//     const matchesSearch = ad.adTitle.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "All" || ad.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-4">📂 Your Ad History</h2>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
//         <input
//           type="text"
//           placeholder="🔍 Search by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="px-4 py-2 border rounded w-full md:w-1/3"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-3 py-2 border rounded text-sm w-full md:w-40"
//         >
//           <option value="All">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading ads...</p>
//       ) : errorMsg ? (
//         <p className="text-red-500">{errorMsg}</p>
//       ) : filteredAds.length === 0 ? (
//         <p className="text-gray-600">No ads found matching the criteria.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredAds.map((ad) => {
//             const startDate = new Date(ad.createdAt);
//             const endDate = new Date(startDate);
//             endDate.setDate(startDate.getDate() + ad.durationInDays);

//             return (
//               <div
//                 key={ad._id}
//                 className="bg-white rounded-xl shadow p-4 border border-gray-200"
//               >
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold">{ad.adTitle}</h3>
//                   <span className={`text-sm font-medium ${getStatusColor(ad.status)}`}>
//                     {ad.status}
//                   </span>
//                 </div>

//                 <img
//                   src={ad.adImage}
//                   alt="Ad"
//                   className="mt-3 h-48 w-full object-cover rounded-md"
//                 />

//                 <p className="text-sm text-gray-600 mt-3">{ad.description}</p>

//                 <div className="mt-4 text-sm text-gray-700">
//                   <p>
//                     <strong>Duration:</strong> {ad.durationInDays} days
//                   </p>
//                   <p>
//                     <strong>Vehicles:</strong> {ad.totalVehicles}
//                   </p>
//                   <p>
//                     <strong>Price/Vehicle:</strong> ₹{ad.pricePerVehicle}
//                   </p>
//                   <p>
//                     <strong>Total Amount:</strong> ₹{ad.totalAmount}
//                   </p>
//                   <p>
//                     <strong>Start Date:</strong> {startDate.toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>End Date:</strong> {endDate.toLocaleDateString()}
//                   </p>
//                 </div>

//                 {ad.status === "Approved" && ad.assignedDrivers?.length > 0 && (
//                   <div className="mt-4">
//                     <strong>Assigned Drivers:</strong>
//                     <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
//                       {ad.assignedDrivers.map((driver) => (
//                         <li key={driver._id}>
//                           {driver.name} — {driver.vehicleNumber} ({driver.platform})
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {(ad.status === "Pending" || ad.status === "Rejected") && (
//                   <div className="mt-4 flex gap-3">
//                     {ad.status === "Pending" && (
//                       <button
//                         onClick={() => handleEdit(ad._id)}
//                         className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//                       >
//                         ✏️ Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDelete(ad._id)}
//                       className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       ❌ Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyAds;

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { FileText, Search, Filter, Pencil, Trash, XCircle, CheckCircle, Clock } from "lucide-react";

// Placeholder for a custom modal/toast component.
const showCustomConfirmation = (message) => {
  return window.confirm(message);
};

const showErrorMessage = (message) => {
  console.error("Error:", message);
  // Replace with a custom modal/toast
};

const CompanyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyAds();
  }, []);

  const fetchCompanyAds = async () => {
    try {
      const res = await axiosInstance.get("/ad/getCompanyAd");
      const updatedAds = res.data.map(ad => {
        if (ad.status === "Approved") {
          const createdDate = new Date(ad.createdAt);
          const expiryDate = new Date(createdDate);
          expiryDate.setDate(createdDate.getDate() + ad.durationInDays);
          const today = new Date();
          if (today > expiryDate) {
            ad.status = "Completed";
          }
        }
        return ad;
      });
      setAds(updatedAds);
    } catch (err) {
      console.error("Error fetching company ads:", err);
      setErrorMsg("Failed to load your ads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (adId) => {
    navigate(`/company/edit-ad/${adId}`);
  };

  const handleDelete = async (adId) => {
    const confirmDelete = showCustomConfirmation("Are you sure you want to delete this ad?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/ad/${adId}`);
      fetchCompanyAds(); // Refresh ads after delete
    } catch (err) {
      console.error("Delete failed:", err);
      showErrorMessage("Error deleting ad.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-400";
      case "Approved":
        return "text-green-400";
      case "Rejected":
        return "text-red-400";
      case "Completed":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.adTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-black text-gray-200">
      {/* Animated background overlay */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      <div className="z-10 w-full max-w-5xl">
        <div className="flex items-center space-x-4 mb-8 p-4 border-b border-gray-700">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-purple-900/50">
            <FileText size={32} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white drop-shadow-sm">Your Ad History</h2>
            <p className="mt-1 text-gray-400">
              View and manage all your ad campaigns.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div className="relative w-full md:w-40">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="All" className="bg-gray-800">All</option>
              <option value="Pending" className="bg-gray-800">Pending</option>
              <option value="Approved" className="bg-gray-800">Approved</option>
              <option value="Rejected" className="bg-gray-800">Rejected</option>
              <option value="Completed" className="bg-gray-800">Completed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading ads...</p>
        ) : errorMsg ? (
          <p className="text-red-400 text-center">{errorMsg}</p>
        ) : filteredAds.length === 0 ? (
          <p className="text-gray-400 text-center">No ads found matching the criteria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAds.map((ad) => {
              const startDate = new Date(ad.createdAt);
              const endDate = new Date(startDate);
              endDate.setDate(startDate.getDate() + ad.durationInDays);
              const status = ad.status;

              return (
                <div
                  key={ad._id}
                  className="bg-gray-800/60 rounded-xl border border-gray-700 p-6 shadow-lg shadow-purple-900/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-900/70"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{ad.adTitle}</h3>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${getStatusColor(status)}`}>
                      {status === "Pending" && <Clock size={16} />}
                      {status === "Approved" && <CheckCircle size={16} />}
                      {status === "Rejected" && <XCircle size={16} />}
                      {status === "Completed" && <FileText size={16} />}
                      <span>{status}</span>
                    </div>
                  </div>

                  <img
                    src={ad.adImage}
                    alt="Ad"
                    className="mt-4 h-48 w-full object-cover rounded-xl"
                  />

                  <p className="text-sm text-gray-400 mt-4">{ad.description}</p>

                  <div className="mt-4 text-sm text-gray-400 space-y-1">
                    <p>
                      <strong>Duration:</strong> {ad.durationInDays} days
                    </p>
                    <p>
                      <strong>Vehicles:</strong> {ad.totalVehicles}
                    </p>
                    <p>
                      <strong>Price/Vehicle:</strong> ₹{ad.pricePerVehicle}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ₹{ad.totalAmount}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {startDate.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>End Date:</strong> {endDate.toLocaleDateString()}
                    </p>
                  </div>

                  {status === "Approved" && ad.assignedDrivers?.length > 0 && (
                    <div className="mt-4">
                      <strong className="text-white">Assigned Drivers:</strong>
                      <ul className="list-disc ml-6 text-sm text-gray-400 mt-1">
                        {ad.assignedDrivers.map((driver) => (
                          <li key={driver._id}>
                            {driver.name} — {driver.vehicleNumber} ({driver.platform})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(status === "Pending" || status === "Rejected") && (
                    <div className="mt-4 flex gap-3">
                      {status === "Pending" && (
                        <button
                          onClick={() => handleEdit(ad._id)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-purple-900/50 transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-purple-900/70 active:scale-95"
                        >
                          <Pencil size={16} />
                          <span>Edit</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-semibold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-red-900/70 active:scale-95"
                      >
                        <Trash size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyAds;
