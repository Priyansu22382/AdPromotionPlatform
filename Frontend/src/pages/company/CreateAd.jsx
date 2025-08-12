// import React, { useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import { useNavigate } from "react-router-dom";

// const CreateAd = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     adTitle: "",
//     adImage: "",
//     durationInDays: "",
//     totalVehicles: "",
//     pricePerVehicle: "",
//     totalAmount: "",
//     description: "",
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === "pricePerVehicle" || name === "totalVehicles") {
//       const totalAmount =
//         name === "pricePerVehicle"
//           ? value * form.totalVehicles
//           : form.pricePerVehicle * value;

//       setForm((prev) => ({
//         ...prev,
//         totalAmount,
//       }));
//     }
//   };

//   // Convert file to base64
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setForm((prev) => ({
//         ...prev,
//         adImage: reader.result,
//       }));
//       setPreviewImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");
//     setSuccessMsg("");

//     const {
//       adTitle,
//       adImage,
//       durationInDays,
//       totalVehicles,
//       pricePerVehicle,
//       totalAmount,
//       description,
//     } = form;

//     if (
//       !adTitle ||
//       !adImage ||
//       !durationInDays ||
//       !totalVehicles ||
//       !pricePerVehicle ||
//       !totalAmount ||
//       !description
//     ) {
//       setErrorMsg("Please fill in all fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axiosInstance.post("/ad/createAd", form);
//       setSuccessMsg("Ad created successfully!");
//       setForm({
//         adTitle: "",
//         adImage: "",
//         durationInDays: "",
//         totalVehicles: "",
//         pricePerVehicle: "",
//         totalAmount: "",
//         description: "",
//       });
//       setPreviewImage(null);
//       setTimeout(() => {
//         navigate("/company/");
//       }, 1500);
//     } catch (err) {
//       console.error("Create ad error:", err);
//       setErrorMsg(
//         err?.response?.data?.message || "Something went wrong. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">📢 Create New Ad</h2>

//       {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
//       {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="adTitle"
//           placeholder="Ad Title"
//           value={form.adTitle}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <textarea
//           name="description"
//           placeholder="Ad Description"
//           rows={3}
//           value={form.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         ></textarea>

//         <input
//           type="number"
//           name="durationInDays"
//           placeholder="Duration in Days"
//           value={form.durationInDays}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="number"
//           name="totalVehicles"
//           placeholder="Total Vehicles Required"
//           value={form.totalVehicles}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="number"
//           name="pricePerVehicle"
//           placeholder="Price per Vehicle"
//           value={form.pricePerVehicle}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="number"
//           name="totalAmount"
//           placeholder="Total Amount (Auto-calculated)"
//           value={form.totalAmount}
//           readOnly
//           className="w-full border p-2 rounded bg-gray-100"
//         />

//         <div>
//           <label className="block mb-1">Upload Ad Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full border p-2 rounded"
//           />
//           {previewImage && (
//             <img
//               src={previewImage}
//               alt="Preview"
//               className="mt-3 h-40 rounded object-cover"
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {loading ? "Submitting..." : "Create Ad"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateAd;

import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Image, Text, Calendar, Car, Tag, DollarSign, UploadCloud } from "lucide-react";

const CreateAd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    adTitle: "",
    adImage: "",
    durationInDays: "",
    totalVehicles: "",
    pricePerVehicle: "",
    totalAmount: "",
    description: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "pricePerVehicle" || name === "totalVehicles") {
      const price = parseFloat(name === "pricePerVehicle" ? value : form.pricePerVehicle);
      const vehicles = parseFloat(name === "totalVehicles" ? value : form.totalVehicles);
      
      // Calculate total amount only if both values are valid numbers
      const totalAmount = (price && vehicles) ? price * vehicles : "";

      setForm((prev) => ({
        ...prev,
        totalAmount,
      }));
    }
  };

  // Convert file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        adImage: reader.result,
      }));
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const {
      adTitle,
      adImage,
      durationInDays,
      totalVehicles,
      pricePerVehicle,
      totalAmount,
      description,
    } = form;

    if (
      !adTitle ||
      !adImage ||
      !durationInDays ||
      !totalVehicles ||
      !pricePerVehicle ||
      !totalAmount ||
      !description
    ) {
      setErrorMsg("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/ad/createAd", form);
      setSuccessMsg("Ad created successfully!");
      setForm({
        adTitle: "",
        adImage: "",
        durationInDays: "",
        totalVehicles: "",
        pricePerVehicle: "",
        totalAmount: "",
        description: "",
      });
      setPreviewImage(null);
      setTimeout(() => {
        navigate("/company/");
      }, 1500);
    } catch (err) {
      console.error("Create ad error:", err);
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-black text-gray-200">
      {/* Animated background overlay */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
      <div className="z-10 w-full max-w-2xl p-8 rounded-3xl border border-gray-700 bg-gray-800/60 shadow-lg shadow-purple-900/50 backdrop-blur-md transition-shadow duration-300 hover:shadow-xl">
        <div className="flex items-center space-x-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-purple-900/50">
              <PlusCircle size={32} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-sm">Create New Ad</h2>
              <p className="mt-1 text-gray-400">
                Fill out the details to create a new ad campaign.
              </p>
            </div>
        </div>

        {errorMsg && <p className="text-red-400 mb-4">{errorMsg}</p>}
        {successMsg && <p className="text-green-400 mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Text className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="adTitle"
              placeholder="Ad Title"
              value={form.adTitle}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
            />
          </div>

          <div className="relative">
            <Text className="absolute left-4 top-4 text-gray-400" size={20} />
            <textarea
              name="description"
              placeholder="Ad Description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                name="durationInDays"
                placeholder="Duration in Days"
                value={form.durationInDays}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
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
                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
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
                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-900/30"
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
                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-400">
              <UploadCloud className="inline-block mr-2 text-purple-400" size={20} />
              Upload Ad Image
            </label>
            <div className="relative border-2 border-dashed border-gray-700 rounded-xl p-6 text-center transition-all duration-300 hover:border-purple-500 hover:bg-gray-800">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mx-auto h-40 rounded-xl object-cover shadow-lg"
                />
              ) : (
                <p className="text-gray-500">Drag and drop an image or click to browse</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 py-3 font-semibold text-white shadow-lg shadow-purple-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-900/70 active:scale-95 disabled:bg-gray-700 disabled:shadow-none disabled:scale-100"
          >
            {loading ? "Submitting..." : "Create Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAd;
