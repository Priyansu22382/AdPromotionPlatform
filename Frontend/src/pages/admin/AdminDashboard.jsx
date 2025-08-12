
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";

// const AdminDashboard = () => {
//   const [ads, setAds] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedAd, setSelectedAd] = useState(null);
//   const [selectedDrivers, setSelectedDrivers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [driverModalOpen, setDriverModalOpen] = useState(false);
//   const [modalDriverTitle, setModalDriverTitle] = useState("");
//   const [modalDriverData, setModalDriverData] = useState([]);

//   useEffect(() => {
//     fetchAllAds();
//     fetchDrivers();
//   }, []);

//   const fetchAllAds = async () => {
//     try {
//       const res = await axiosInstance.get("/ad/admin/allAds");
//       setAds(res.data);
//     } catch (err) {
//       console.error("Error fetching ads:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDrivers = async () => {
//     try {
//       const res = await axiosInstance.get("/auth/admin/cab-driver/all");
//       setDrivers(res.data);
//     } catch (err) {
//       console.error("Error fetching drivers:", err);
//     }
//   };

//   const handleApprove = (ad) => {
//     setSelectedAd(ad);
//     setSelectedDrivers([]);
//     setIsModalOpen(true);
//   };

//   const confirmApproveAndAssign = async () => {
//     if (selectedDrivers.length !== selectedAd.totalVehicles) {
//       alert(`Please select exactly ${selectedAd.totalVehicles} drivers.`);
//       return;
//     }

//     try {
//       await axiosInstance.put("/ad/admin/approve-assign", {
//         adId: selectedAd._id,
//         driverIds: selectedDrivers
//       });
//       setIsModalOpen(false);
//       fetchAllAds();
//       fetchDrivers();
//     } catch (err) {
//       console.error("Error assigning drivers:", err);
//     }
//   };

//   const handleReject = async (adId) => {
//     try {
//       await axiosInstance.put(`/ad/admin/reject/${adId}`);
//       fetchAllAds();
//     } catch (err) {
//       console.error("Error rejecting ad:", err);
//     }
//   };

//   const handleDelete = async (adId) => {
//     if (!window.confirm("Are you sure you want to delete this ad?")) return;

//     try {
//       await axiosInstance.delete(`/auth/admin/delete-ad/${adId}`);
//       fetchAllAds();
//     } catch (err) {
//       console.error("Error deleting ad:", err);
//     }
//   };

//   const toggleDriverSelection = (driverId) => {
//     setSelectedDrivers((prev) =>
//       prev.includes(driverId)
//         ? prev.filter((id) => id !== driverId)
//         : [...prev, driverId]
//     );
//   };

//   const availableDrivers = drivers.filter((d) => d.isAvailable);

//   return (
//     <div className="min-h-screen bg-gray-100 px-6 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">🛠️ Admin Dashboard</h1>

//       {/* Driver Overview */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div
//           className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer"
//           onClick={() => {
//             setModalDriverTitle("All Cab Drivers");
//             setModalDriverData(drivers);
//             setDriverModalOpen(true);
//           }}
//         >
//           <h2 className="text-gray-700 font-semibold mb-1">Total Cab Drivers</h2>
//           <p className="text-2xl font-bold text-gray-900">{drivers.length}</p>
//         </div>
//         <div
//           className="bg-green-50 shadow-md rounded-lg p-4 border border-green-200 cursor-pointer"
//           onClick={() => {
//             setModalDriverTitle("Available Cab Drivers");
//             setModalDriverData(availableDrivers);
//             setDriverModalOpen(true);
//           }}
//         >
//           <h2 className="text-green-700 font-semibold mb-1">Available</h2>
//           <p className="text-2xl font-bold text-green-800">{availableDrivers.length}</p>
//         </div>
//         <div
//           className="bg-red-50 shadow-md rounded-lg p-4 border border-red-200 cursor-pointer"
//           onClick={() => {
//             setModalDriverTitle("Unavailable Cab Drivers");
//             setModalDriverData(drivers.filter((d) => !d.isAvailable));
//             setDriverModalOpen(true);
//           }}
//         >
//           <h2 className="text-red-700 font-semibold mb-1">Not Available</h2>
//           <p className="text-2xl font-bold text-red-800">{drivers.length - availableDrivers.length}</p>
//         </div>
//       </div>

//       {/* Ads Section */}
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">📢 Ad Requests</h2>

//       {loading ? (
//         <p className="text-gray-500">Loading ads...</p>
//       ) : ads.length === 0 ? (
//         <p className="text-gray-500">No ads submitted yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {ads.map((ad) => {
//             const startDate = new Date(ad.createdAt);
//             const endDate = new Date(startDate);
//             endDate.setDate(startDate.getDate() + ad.durationInDays);

//             return (
//               <div key={ad._id} className="bg-white shadow-sm rounded-lg p-5 border border-gray-200">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-800">{ad.adTitle}</h3>
//                     <span
//                       className={`text-sm font-medium ${
//                         ad.status === "Pending"
//                           ? "text-yellow-600"
//                           : ad.status === "Approved"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {ad.status}
//                     </span>
//                   </div>
//                   <img
//                     src={ad.adImage}
//                     alt="Ad"
//                     className="w-24 h-24 object-cover rounded-md border"
//                   />
//                 </div>

//                 <p className="text-sm text-gray-600 mb-3">{ad.description}</p>

//                 <div className="text-sm text-gray-700 space-y-1">
//                   <p><strong>Company:</strong> {ad.company?.companyName}</p>
//                   <p><strong>Email:</strong> {ad.company?.email}</p>
//                   <p><strong>Vehicles Needed:</strong> {ad.totalVehicles}</p>
//                   <p><strong>Price/Vehicle:</strong> ₹{ad.pricePerVehicle}</p>
//                   <p><strong>Total:</strong> ₹{ad.totalAmount}</p>
//                   <p><strong>Start Date:</strong> {startDate.toLocaleDateString()}</p>
//                   <p><strong>End Date:</strong> {endDate.toLocaleDateString()}</p>
//                 </div>

//                 {ad.status === "Pending" && (
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={() => handleApprove(ad)}
//                       className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
//                     >
//                       ✅ Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(ad._id)}
//                       className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//                     >
//                       ❌ Reject
//                     </button>
//                   </div>
//                 )}

//                 {ad.status === "Rejected" && (
//                   <div className="mt-4">
//                     <button
//                       onClick={() => handleDelete(ad._id)}
//                       className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//                     >
//                       🗑️ Delete
//                     </button>
//                   </div>
//                 )}

//                 {ad.status === "Approved" && ad.assignedDrivers?.length > 0 && (
//                   <div className="mt-4 text-sm">
//                     <strong>Assigned Drivers:</strong>
//                     <ul className="list-disc pl-6 mt-1 text-gray-700">
//                       {ad.assignedDrivers.map((driver) => (
//                         <li key={driver._id}>
//                           {driver.name} — {driver.vehicleNumber} ({driver.platform})
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modal for Approving and Assigning Drivers */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Assign Drivers to: {selectedAd.adTitle}</h2>

//             <p className="mb-2 text-sm text-gray-600">
//               Select exactly {selectedAd.totalVehicles} available drivers:
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto mb-4">
//               {availableDrivers.map((driver) => (
//                 <label
//                   key={driver._id}
//                   className={`p-3 border rounded cursor-pointer flex justify-between items-center ${
//                     selectedDrivers.includes(driver._id) ? "bg-blue-100 border-blue-400" : ""
//                   }`}
//                 >
//                   <span>
//                     {driver.name} — {driver.vehicleNumber} ({driver.platform})
//                   </span>
//                   <input
//                     type="checkbox"
//                     checked={selectedDrivers.includes(driver._id)}
//                     onChange={() => toggleDriverSelection(driver._id)}
//                   />
//                 </label>
//               ))}
//             </div>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmApproveAndAssign}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Confirm Assignment
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for Viewing Driver Lists */}
//       {driverModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4">{modalDriverTitle}</h2>
//             {modalDriverData.length === 0 ? (
//               <p className="text-gray-500">No drivers found.</p>
//             ) : (
//               <ul className="space-y-3 max-h-80 overflow-y-auto text-sm">
//                 {modalDriverData.map((driver) => (
//                   <li key={driver._id} className="border-b pb-2">
//                     <strong>{driver.name}</strong><br />
//                     Email: {driver.email}<br />
//                     Vehicle: {driver.vehicleNumber}<br />
//                     Platform: {driver.platform}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <div className="text-right mt-4">
//               <button
//                 onClick={() => setDriverModalOpen(false)}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { ShieldCheck, User, CheckCircle, XCircle, FileText } from "lucide-react";

const AdminDashboard = () => {
  const [ads, setAds] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
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
    setIsAssignModalOpen(true);
  };

  const confirmApproveAndAssign = async () => {
    if (selectedDrivers.length !== selectedAd.totalVehicles) {
      setAlertMessage(`Please select exactly ${selectedAd.totalVehicles} drivers.`);
      setIsAlertModalOpen(true);
      return;
    }

    try {
      await axiosInstance.put("/ad/admin/approve-assign", {
        adId: selectedAd._id,
        driverIds: selectedDrivers,
      });
      setIsAssignModalOpen(false);
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

  const handleDelete = (adId) => {
    setAdToDelete(adId);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/auth/admin/delete-ad/${adToDelete}`);
      setIsConfirmDeleteModalOpen(false);
      setAdToDelete(null);
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
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-950 to-black text-gray-200 font-inter">
      {/* Animated background overlay */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
      {/* Main Content */}
      <div className="z-10 w-full max-w-5xl">
        <header className="flex justify-between items-center mb-10 p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400 shadow-lg shadow-cyan-900/50">
              <ShieldCheck size={32} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">Admin Dashboard</h1>
              <p className="mt-1 text-gray-400">
                Manage ad requests and view all cab driver information.
              </p>
            </div>
          </div>
        </header>

        {/* Driver Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div
            className="group bg-gray-900/50 rounded-2xl border border-gray-800 p-8 shadow-xl shadow-gray-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-900/50 cursor-pointer"
            onClick={() => {
              setModalDriverTitle("All Cab Drivers");
              setModalDriverData(drivers);
              setDriverModalOpen(true);
            }}
          >
            <User className="text-cyan-400 group-hover:text-white transition-colors" size={32} />
            <h2 className="text-xl font-bold text-white mt-4">Total Drivers</h2>
            <p className="text-sm text-gray-400 mt-2">
              <span className="text-3xl font-bold text-cyan-400">{drivers.length}</span>
            </p>
          </div>
          <div
            className="group bg-gray-900/50 rounded-2xl border border-gray-800 p-8 shadow-xl shadow-gray-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-900/50 cursor-pointer"
            onClick={() => {
              setModalDriverTitle("Available Cab Drivers");
              setModalDriverData(availableDrivers);
              setDriverModalOpen(true);
            }}
          >
            <CheckCircle className="text-green-400 group-hover:text-white transition-colors" size={32} />
            <h2 className="text-xl font-bold text-white mt-4">Available Drivers</h2>
            <p className="text-sm text-gray-400 mt-2">
              <span className="text-3xl font-bold text-green-400">{availableDrivers.length}</span>
            </p>
          </div>
          <div
            className="group bg-gray-900/50 rounded-2xl border border-gray-800 p-8 shadow-xl shadow-gray-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-900/50 cursor-pointer"
            onClick={() => {
              setModalDriverTitle("Unavailable Cab Drivers");
              setModalDriverData(drivers.filter((d) => !d.isAvailable));
              setDriverModalOpen(true);
            }}
          >
            <XCircle className="text-red-400 group-hover:text-white transition-colors" size={32} />
            <h2 className="text-xl font-bold text-white mt-4">Unavailable Drivers</h2>
            <p className="text-sm text-gray-400 mt-2">
              <span className="text-3xl font-bold text-red-400">{drivers.length - availableDrivers.length}</span>
            </p>
          </div>
        </div>

        {/* Ads Section */}
        <h2 className="text-2xl font-bold text-white mb-6">📢 Ad Requests</h2>

        {loading ? (
          <div className="p-8 bg-gray-900/50 rounded-2xl text-center border border-gray-800">
            <p className="text-gray-400 text-lg">Loading ads...</p>
          </div>
        ) : ads.length === 0 ? (
          <div className="p-8 bg-gray-900/50 rounded-2xl text-center border border-gray-800">
            <p className="text-gray-400 text-lg">No ads submitted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((ad) => {
              const startDate = new Date(ad.createdAt);
              const endDate = new Date(startDate);
              endDate.setDate(startDate.getDate() + ad.durationInDays);

              return (
                <div key={ad._id} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 shadow-xl shadow-gray-950/50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{ad.adTitle}</h3>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          ad.status === "Pending"
                            ? "bg-yellow-600/30 text-yellow-400"
                            : ad.status === "Approved"
                            ? "bg-green-600/30 text-green-400"
                            : "bg-red-600/30 text-red-400"
                        }`}
                      >
                        {ad.status}
                      </span>
                    </div>
                    <img
                      src={ad.adImage}
                      alt="Ad"
                      className="w-24 h-24 object-cover rounded-xl border border-gray-700"
                    />
                  </div>

                  <p className="text-sm text-gray-400 mb-3">{ad.description}</p>

                  <div className="text-sm text-gray-400 space-y-1">
                    <p><strong>Company:</strong> {ad.company?.companyName}</p>
                    <p><strong>Email:</strong> {ad.company?.email}</p>
                    <p><strong>Vehicles Needed:</strong> <span className="font-semibold text-cyan-400">{ad.totalVehicles}</span></p>
                    <p><strong>Price/Vehicle:</strong> <span className="font-semibold text-cyan-400">₹{ad.pricePerVehicle}</span></p>
                    <p><strong>Total:</strong> <span className="font-semibold text-cyan-400">₹{ad.totalAmount}</span></p>
                    <p><strong>Start Date:</strong> {startDate.toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {endDate.toLocaleDateString()}</p>
                  </div>

                  {ad.status === "Pending" && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleApprove(ad)}
                        className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white text-sm rounded-xl font-semibold shadow-lg shadow-green-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-900/70"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleReject(ad._id)}
                        className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white text-sm rounded-xl font-semibold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-900/70"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}

                  {ad.status === "Rejected" && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white text-sm rounded-xl font-semibold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-900/70"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}

                  {ad.status === "Approved" && ad.assignedDrivers?.length > 0 && (
                    <div className="mt-4 text-sm text-gray-400">
                      <strong>Assigned Drivers:</strong>
                      <ul className="list-disc pl-6 mt-1 text-gray-400">
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
        {isAssignModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 w-full max-w-2xl p-6 rounded-2xl shadow-lg text-gray-200 border border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-white">Assign Drivers to: {selectedAd.adTitle}</h2>
              <p className="mb-2 text-sm text-gray-400">
                Select exactly {selectedAd.totalVehicles} available drivers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto mb-4">
                {availableDrivers.map((driver) => (
                  <label
                    key={driver._id}
                    className={`p-3 border rounded-xl cursor-pointer flex justify-between items-center transition-colors duration-200 ${
                      selectedDrivers.includes(driver._id)
                        ? "bg-cyan-600/30 border-cyan-500"
                        : "bg-gray-800/60 border-gray-700 hover:bg-gray-700/60"
                    }`}
                  >
                    <span>
                      {driver.name} — {driver.vehicleNumber} ({driver.platform})
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedDrivers.includes(driver._id)}
                      onChange={() => toggleDriverSelection(driver._id)}
                      className="form-checkbox h-4 w-4 text-cyan-600 bg-gray-900 border-gray-700 rounded focus:ring-cyan-500"
                    />
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApproveAndAssign}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-800 text-white font-semibold shadow-lg shadow-cyan-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-900/70"
                >
                  Confirm Assignment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Viewing Driver Lists */}
        {driverModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 w-full max-w-2xl p-6 rounded-2xl shadow-lg text-gray-200 border border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-white">{modalDriverTitle}</h2>
              {modalDriverData.length === 0 ? (
                <p className="text-gray-500">No drivers found.</p>
              ) : (
                <ul className="space-y-3 max-h-80 overflow-y-auto text-sm pr-2">
                  {modalDriverData.map((driver) => (
                    <li key={driver._id} className="border-b border-gray-700 pb-2 last:border-b-0">
                      <strong>{driver.name}</strong><br />
                      <span className="text-gray-400">Email: {driver.email}</span><br />
                      <span className="text-gray-400">Vehicle: {driver.vehicleNumber}</span><br />
                      <span className="text-gray-400">Platform: {driver.platform}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-right mt-4">
                <button
                  onClick={() => setDriverModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Alert Modal */}
        {isAlertModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 w-full max-w-sm p-6 rounded-2xl shadow-lg text-gray-200 border border-gray-800 text-center">
              <p className="text-lg mb-4">{alertMessage}</p>
              <button
                onClick={() => setIsAlertModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        )}
        
        {/* Custom Confirmation Modal */}
        {isConfirmDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 w-full max-w-sm p-6 rounded-2xl shadow-lg text-gray-200 border border-gray-800 text-center">
              <p className="text-lg mb-4">Are you sure you want to delete this ad?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsConfirmDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-900/70"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
