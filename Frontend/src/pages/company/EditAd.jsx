// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../lib/axios";

// const EditAd = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     adTitle: "",
//     description: "",
//     durationInDays: "",
//     totalVehicles: "",
//     pricePerVehicle: "",
//     totalAmount: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");

//   // Fetch ad details
//   useEffect(() => {
//     const fetchAd = async () => {
//       try {
//         const res = await axiosInstance.get(`/ad/getCompanyAd`);
//         const adToEdit = res.data.find((ad) => ad._id === id);

//         if (!adToEdit) {
//           setErrorMsg("Ad not found.");
//         } else if (adToEdit.status !== "Pending") {
//           setErrorMsg("Only pending ads can be edited.");
//         } else {
//           setForm({
//             adTitle: adToEdit.adTitle,
//             description: adToEdit.description,
//             durationInDays: adToEdit.durationInDays,
//             totalVehicles: adToEdit.totalVehicles,
//             pricePerVehicle: adToEdit.pricePerVehicle,
//             totalAmount: adToEdit.totalAmount,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching ad:", err);
//         setErrorMsg("Failed to fetch ad data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAd();
//   }, [id]);

//   // Automatically update totalAmount
//   useEffect(() => {
//     const vehicles = parseInt(form.totalVehicles);
//     const price = parseFloat(form.pricePerVehicle);

//     if (!isNaN(vehicles) && !isNaN(price)) {
//       setForm((prev) => ({
//         ...prev,
//         totalAmount: vehicles * price,
//       }));
//     }
//   }, [form.totalVehicles, form.pricePerVehicle]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axiosInstance.put(`/ad/${id}`, form);
//       console.log("Updated:", res.data);
//       navigate("/company/ads");
//     } catch (err) {
//       console.error("Update error:", err);
//       setErrorMsg("Failed to update the ad.");
//     }
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-4">✏️ Edit Ad</h2>

//       {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

//       {!errorMsg && (
//         <form
//           onSubmit={handleUpdate}
//           className="bg-white rounded-xl shadow p-6 max-w-xl space-y-4"
//         >
//           <div>
//             <label className="block font-medium mb-1">Ad Title</label>
//             <input
//               type="text"
//               name="adTitle"
//               value={form.adTitle}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Description</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               rows={3}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block font-medium mb-1">Duration (Days)</label>
//               <input
//                 type="number"
//                 name="durationInDays"
//                 value={form.durationInDays}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Vehicles</label>
//               <input
//                 type="number"
//                 name="totalVehicles"
//                 value={form.totalVehicles}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Price / Vehicle (₹)</label>
//               <input
//                 type="number"
//                 name="pricePerVehicle"
//                 value={form.pricePerVehicle}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Total Amount (₹)</label>
//               <input
//                 type="number"
//                 name="totalAmount"
//                 value={form.totalAmount}
//                 readOnly
//                 className="w-full border bg-gray-100 text-gray-600 rounded p-2"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Update Ad
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditAd;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../lib/axios";
// import { Pencil, Text, Calendar, Car, Tag, DollarSign, XCircle } from "lucide-react";

// const EditAd = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     adTitle: "",
//     description: "",
//     durationInDays: "",
//     totalVehicles: "",
//     pricePerVehicle: "",
//     totalAmount: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   // Fetch ad details
//   useEffect(() => {
//     const fetchAd = async () => {
//       try {
//         const res = await axiosInstance.get(`/ad/getCompanyAd`);
//         const adToEdit = res.data.find((ad) => ad._id === id);

//         if (!adToEdit) {
//           setErrorMsg("Ad not found.");
//         } else if (adToEdit.status !== "Pending") {
//           setErrorMsg("Only pending ads can be edited.");
//         } else {
//           setForm({
//             adTitle: adToEdit.adTitle,
//             description: adToEdit.description,
//             durationInDays: adToEdit.durationInDays,
//             totalVehicles: adToEdit.totalVehicles,
//             pricePerVehicle: adToEdit.pricePerVehicle,
//             totalAmount: adToEdit.totalAmount,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching ad:", err);
//         setErrorMsg("Failed to fetch ad data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAd();
//   }, [id]);

//   // Automatically update totalAmount
//   useEffect(() => {
//     const vehicles = parseInt(form.totalVehicles);
//     const price = parseFloat(form.pricePerVehicle);

//     if (!isNaN(vehicles) && !isNaN(price)) {
//       setForm((prev) => ({
//         ...prev,
//         totalAmount: vehicles * price,
//       }));
//     }
//   }, [form.totalVehicles, form.pricePerVehicle]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setIsUpdating(true);
//     setErrorMsg("");

//     try {
//       const res = await axiosInstance.put(`/ad/${id}`, form);
//       console.log("Updated:", res.data);
//       navigate("/company/ads");
//     } catch (err) {
//       console.error("Update error:", err);
//       setErrorMsg(err.response?.data?.message || "Failed to update the ad.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   if (loading) {
//     return <p className="p-6 text-gray-400 text-center">Loading...</p>;
//   }

//   return (
//     <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-black text-gray-200">
//       {/* Animated background overlay */}
//       <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
//       <div className="z-10 w-full max-w-2xl p-8 rounded-3xl border border-gray-700 bg-gray-800/60 shadow-lg shadow-purple-900/50 backdrop-blur-md transition-shadow duration-300 hover:shadow-xl">
//         <div className="flex items-center space-x-4 mb-8">
//             <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-purple-900/50">
//               <Pencil size={32} strokeWidth={2} />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold text-white drop-shadow-sm">Edit Ad</h2>
//               <p className="mt-1 text-gray-400">
//                 Modify the details of your pending ad campaign.
//               </p>
//             </div>
//         </div>

//         {errorMsg && (
//           <div className="flex items-center space-x-2 p-4 mb-4 bg-red-900/50 rounded-xl text-red-400">
//             <XCircle size={20} />
//             <p>{errorMsg}</p>
//           </div>
//         )}

//         {!errorMsg && (
//           <form
//             onSubmit={handleUpdate}
//             className="space-y-6"
//           >
//             <div className="relative">
//               <Text className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 name="adTitle"
//                 placeholder="Ad Title"
//                 value={form.adTitle}
//                 onChange={handleChange}
//                 className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
//                 required
//               />
//             </div>

//             <div className="relative">
//               <Text className="absolute left-4 top-4 text-gray-400" size={20} />
//               <textarea
//                 name="description"
//                 placeholder="Ad Description"
//                 value={form.description}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="relative">
//                 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="number"
//                   name="durationInDays"
//                   placeholder="Duration in Days"
//                   value={form.durationInDays}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="number"
//                   name="totalVehicles"
//                   placeholder="Total Vehicles Required"
//                   value={form.totalVehicles}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="relative">
//                 <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="number"
//                   name="pricePerVehicle"
//                   placeholder="Price per Vehicle"
//                   value={form.pricePerVehicle}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="number"
//                   name="totalAmount"
//                   placeholder="Total Amount (Auto-calculated)"
//                   value={form.totalAmount}
//                   readOnly
//                   className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isUpdating}
//               className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 py-3 font-semibold text-white shadow-lg shadow-purple-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-900/70 active:scale-95 disabled:bg-gray-700 disabled:shadow-none disabled:scale-100"
//             >
//               {isUpdating ? "Updating..." : "Update Ad"}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditAd;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { Pencil, Text, CalendarDays, Car, Tag, DollarSign, XCircle } from "lucide-react";

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
  const [isUpdating, setIsUpdating] = useState(false);
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
    setIsUpdating(true);
    setErrorMsg("");

    try {
      const res = await axiosInstance.put(`/ad/${id}`, form);
      console.log("Updated:", res.data);
      navigate("/company/ads");
    } catch (err) {
      console.error("Update error:", err);
      setErrorMsg(err.response?.data?.message || "Failed to update the ad.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-400 text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-black text-gray-200">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-20" />
      
      <div className="z-10 w-full max-w-2xl p-8 rounded-3xl border border-gray-700 bg-gray-800/80 shadow-2xl shadow-gray-950/50 backdrop-blur-md transition-shadow duration-300 hover:shadow-xl">
        <header className="flex items-center space-x-5 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-400/20 text-teal-400 shadow-xl shadow-teal-900/40">
              <Pencil size={36} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-sm">Edit Ad</h2>
              <p className="mt-1 text-gray-400">
                Modify the details of your pending ad campaign.
              </p>
            </div>
        </header>

        {errorMsg && (
          <div className="flex items-center space-x-2 p-4 mb-4 bg-red-900/50 rounded-xl text-red-400">
            <XCircle size={20} />
            <p>{errorMsg}</p>
          </div>
        )}

        {!errorMsg && (
          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >
            <div className="relative">
              <Text className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="adTitle"
                placeholder="Ad Title"
                value={form.adTitle}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 hover:scale-[1.01] hover:shadow-md hover:shadow-teal-900/30"
                required
              />
            </div>

            <div className="relative">
              <Text className="absolute left-4 top-4 text-gray-400" size={20} />
              <textarea
                name="description"
                placeholder="Ad Description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 hover:scale-[1.01] hover:shadow-md hover:shadow-teal-900/30"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="durationInDays"
                  placeholder="Duration in Days"
                  value={form.durationInDays}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 hover:scale-[1.01] hover:shadow-md hover:shadow-teal-900/30"
                  required
                />
              </div>
              <div className="relative">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="totalVehicles"
                  placeholder="Total Vehicles Required"
                  value={form.totalVehicles}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 hover:scale-[1.01] hover:shadow-md hover:shadow-teal-900/30"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="pricePerVehicle"
                  placeholder="Price per Vehicle"
                  value={form.pricePerVehicle}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 hover:scale-[1.01] hover:shadow-md hover:shadow-teal-900/30"
                  required
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  name="totalAmount"
                  placeholder="Total Amount (Auto-calculated)"
                  value={form.totalAmount}
                  readOnly
                  className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-700 py-3 font-semibold text-white shadow-lg shadow-teal-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-900/70 active:scale-95 disabled:bg-gray-700 disabled:shadow-none disabled:scale-100"
            >
              {isUpdating ? "Updating..." : "Update Ad"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditAd;

