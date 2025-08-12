// import React, { useEffect, useState, useRef } from "react";
// import { axiosInstance } from "../../lib/axios";
// import { useNavigate } from "react-router-dom";
// import html2pdf from "html2pdf.js";

// const CabDriverDashboard = () => {
//   const [assignedAds, setAssignedAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cabDriver, setCabDriver] = useState(null);
//   const [selectedAd, setSelectedAd] = useState(null);
//   const [licenseImage, setLicenseImage] = useState(null);
//   const [rcImage, setRcImage] = useState(null);
//   const [selfieImage, setSelfieImage] = useState(null);
//   const navigate = useNavigate();
//   const pdfRef = useRef();

//   useEffect(() => {
//     fetchCabDriverData();
//     fetchAssignedAds();
//   }, []);

//   const fetchCabDriverData = async () => {
//     try {
//       const res = await axiosInstance.get("/auth/cab-driver/check-Auth", { withCredentials: true });
//       setCabDriver(res.data);
//     } catch (err) {
//       console.error("Auth error", err);
//       navigate("/login");
//     }
//   };

//   const fetchAssignedAds = async () => {
//     try {
//       const res = await axiosInstance.get("/ad/cabdriver/assigned-ads", { withCredentials: true });
//       setAssignedAds(res.data);
//     } catch (err) {
//       console.error("Error fetching ads:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleAvailability = async () => {
//     try {
//       const res = await axiosInstance.patch("/auth/cab-driver/toggle-availability", {}, { withCredentials: true });
//       setCabDriver(prev => ({ ...prev, isAvailable: res.data.isAvailable }));
//     } catch (err) {
//       console.error("Error toggling availability", err);
//     }
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     if (licenseImage) formData.append("licenseImage", licenseImage);
//     if (rcImage) formData.append("rcImage", rcImage);
//     if (selfieImage) formData.append("selfieImage", selfieImage);

//     try {
//       await axiosInstance.post("/auth/cab-driver/upload-docs", formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Documents uploaded successfully.");
//     } catch (error) {
//       console.error("Error uploading documents", error);
//       alert("Upload failed.");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axiosInstance.post("/auth/cab-driver/logout", {}, { withCredentials: true });
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error", err);
//     }
//   };

//   const downloadPDF = () => {
//     const image = pdfRef.current.querySelector("img");

//     if (image && !image.complete) {
//       image.onload = () => generatePDF();
//     } else {
//       generatePDF();
//     }
//   };

//   const generatePDF = () => {
//     html2pdf(pdfRef.current, {
//       margin: 10,
//       filename: `${selectedAd.adTitle.replace(/\s+/g, "-")}.pdf`,
//       image: { type: "jpeg", quality: 1 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//       },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-gray-800">🚕 Cab Driver Dashboard</h1>
//         <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//       </div>

//       {/* Driver Info */}
//       {cabDriver && (
//         <div className="mb-6 bg-white shadow p-4 rounded">
//           <p><strong>Name:</strong> {cabDriver.name}</p>
//           <p><strong>Email:</strong> {cabDriver.email}</p>
//           <p><strong>Contact Number:</strong> {cabDriver.phoneNumber}</p>
//           <p><strong>Vehicle Number:</strong> {cabDriver.vehicleNumber}</p>
//           <p><strong>Platform:</strong> {cabDriver.platform}</p>
//           <div className="mt-3">
//             <span className="mr-2 font-medium">Availability:</span>
//             <button
//               onClick={toggleAvailability}
//               className={`px-4 py-1 rounded text-white ${
//                 cabDriver.isAvailable ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
//               }`}
//             >
//               {cabDriver.isAvailable ? "Available (Click to Mark Unavailable)" : "Not Available (Click to Mark Available)"}
//             </button>
//           </div>
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Upload Documents</h3>
//             <input type="file" accept="image/*" onChange={(e) => setLicenseImage(e.target.files[0])} className="mb-2" />
//             <p className="text-sm text-gray-600 mb-1">License Photo</p>
//             <input type="file" accept="image/*" onChange={(e) => setRcImage(e.target.files[0])} className="mb-2" />
//             <p className="text-sm text-gray-600 mb-1">RC Book Photo</p>
//             <input type="file" accept="image/*" onChange={(e) => setSelfieImage(e.target.files[0])} className="mb-2" />
//             <p className="text-sm text-gray-600 mb-1">Selfie with Vehicle</p>
//             <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Upload</button>
//           </div>
//         </div>
//       )}

//       {/* Assigned Ads */}
//       <h2 className="text-xl font-semibold text-gray-700 mb-3">📦 Assigned Ads</h2>

//       {loading ? (
//         <p>Loading assigned ads...</p>
//       ) : assignedAds.length === 0 ? (
//         <p>No ads assigned yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {assignedAds.map(ad => (
//             <div key={ad._id} className="bg-white p-4 rounded shadow border cursor-pointer hover:shadow-md transition" onClick={() => setSelectedAd(ad)}>
//               <h3 className="text-lg font-bold mb-2">{ad.adTitle}</h3>
//               <img src={ad.adImage} alt="Ad" className="w-full h-100 object-cover rounded mb-3" />
//               <p>{ad.description.slice(0, 100)}...</p>
//               <p><strong>Company:</strong> {ad.company?.companyName}</p>
//               <p><strong>Duration:</strong> {ad.durationInDays} days</p>
//               <p><strong>Pay:</strong> ₹{ad.pricePerVehicle}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal for Expanded Ad */}
//       {selectedAd && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
//             <button onClick={() => setSelectedAd(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black">✖</button>
//             <div ref={pdfRef} className="max-h-[70vh] overflow-y-auto pr-2">
//               <h2 className="text-2xl font-bold mb-2">{selectedAd.adTitle}</h2>
//               <img src={selectedAd.adImage} alt="Ad" className="w-[50%] h-[50%] object-cover rounded mb-3" crossOrigin="anonymous" />
//               <p className="mb-2">{selectedAd.description}</p>
//               <p><strong>Company:</strong> {selectedAd.company?.companyName}</p>
//               <p><strong>Duration:</strong> {selectedAd.durationInDays} days</p>
//               <p><strong>Pay:</strong> ₹{selectedAd.pricePerVehicle}</p>
//             </div>
//             <button
//               onClick={downloadPDF}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Download as PDF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CabDriverDashboard;

// import React, { useEffect, useState, useRef } from "react";
// import { axiosInstance } from "../../lib/axios";
// import { useNavigate } from "react-router-dom";
// import html2pdf from "html2pdf.js";

// const CabDriverDashboard = () => {
//   const [assignedAds, setAssignedAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cabDriver, setCabDriver] = useState(null);
//   const [selectedAd, setSelectedAd] = useState(null);
//   const navigate = useNavigate();
//   const pdfRef = useRef();

//   useEffect(() => {
//     fetchCabDriverData();
//     fetchAssignedAds();
//   }, []);

//   const fetchCabDriverData = async () => {
//     try {
//       const res = await axiosInstance.get("/auth/cab-driver/check-Auth", { withCredentials: true });
//       setCabDriver(res.data);
//     } catch (err) {
//       console.error("Auth error", err);
//       navigate("/login");
//     }
//   };

//   const fetchAssignedAds = async () => {
//     try {
//       const res = await axiosInstance.get("/ad/cabdriver/assigned-ads", { withCredentials: true });
//       setAssignedAds(res.data);
//     } catch (err) {
//       console.error("Error fetching ads:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleAvailability = async () => {
//     try {
//       const res = await axiosInstance.patch("/auth/cab-driver/toggle-availability", {}, { withCredentials: true });
//       setCabDriver(prev => ({ ...prev, isAvailable: res.data.isAvailable }));
//     } catch (err) {
//       console.error("Error toggling availability", err);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axiosInstance.post("/auth/cab-driver/logout", {}, { withCredentials: true });
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error", err);
//     }
//   };

//   const downloadPDF = () => {
//     const image = pdfRef.current.querySelector("img");

//     if (image && !image.complete) {
//       image.onload = () => generatePDF();
//     } else {
//       generatePDF();
//     }
//   };

//   const generatePDF = () => {
//     html2pdf(pdfRef.current, {
//       margin: 10,
//       filename: `${selectedAd.adTitle.replace(/\s+/g, "-")}.pdf`,
//       image: { type: "jpeg", quality: 1 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//       },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-gray-800">🚕 Cab Driver Dashboard</h1>
//         <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//       </div>

//       {/* Driver Info */}
//       {cabDriver && (
//         <div className="mb-6 bg-white shadow p-4 rounded">
//           <p><strong>Name:</strong> {cabDriver.name}</p>
//           <p><strong>Email:</strong> {cabDriver.email}</p>
//           <p><strong>Contact Number:</strong> {cabDriver.phoneNumber}</p>
//           <p><strong>Vehicle Number:</strong> {cabDriver.vehicleNumber}</p>
//           <p><strong>Platform:</strong> {cabDriver.platform}</p>
//           <div className="mt-3">
//             <span className="mr-2 font-medium">Availability:</span>
//             <button
//               onClick={toggleAvailability}
//               className={`px-4 py-1 rounded text-white ${
//                 cabDriver.isAvailable ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
//               }`}
//             >
//               {cabDriver.isAvailable ? "Available (Click to Mark Unavailable)" : "Not Available (Click to Mark Available)"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Assigned Ads */}
//       <h2 className="text-xl font-semibold text-gray-700 mb-3">📦 Assigned Ads</h2>

//       {loading ? (
//         <p>Loading assigned ads...</p>
//       ) : assignedAds.length === 0 ? (
//         <p>No ads assigned yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {assignedAds.map(ad => (
//             <div key={ad._id} className="bg-white p-4 rounded shadow border cursor-pointer hover:shadow-md transition" onClick={() => setSelectedAd(ad)}>
//               <h3 className="text-lg font-bold mb-2">{ad.adTitle}</h3>
//               <img src={ad.adImage} alt="Ad" className="w-full h-100 object-cover rounded mb-3" />
//               <p>{ad.description.slice(0, 100)}...</p>
//               <p><strong>Company:</strong> {ad.company?.companyName}</p>
//               <p><strong>Duration:</strong> {ad.durationInDays} days</p>
//               <p><strong>Pay:</strong> ₹{ad.pricePerVehicle}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal for Expanded Ad */}
//       {selectedAd && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
//             <button onClick={() => setSelectedAd(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black">✖</button>
//             <div ref={pdfRef} className="max-h-[70vh] overflow-y-auto pr-2">
//               <h2 className="text-2xl font-bold mb-2">{selectedAd.adTitle}</h2>
//               <img src={selectedAd.adImage} alt="Ad" className="w-[50%] h-[50%] object-cover rounded mb-3" crossOrigin="anonymous" />
//               <p className="mb-2">{selectedAd.description}</p>
//               <p><strong>Company:</strong> {selectedAd.company?.companyName}</p>
//               <p><strong>Duration:</strong> {selectedAd.durationInDays} days</p>
//               <p><strong>Pay:</strong> ₹{selectedAd.pricePerVehicle}</p>
//             </div>
//             <button
//               onClick={downloadPDF}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Download as PDF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CabDriverDashboard;

import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { ShieldCheck, FileText } from "lucide-react";

const CabDriverDashboard = () => {
  const [assignedAds, setAssignedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cabDriver, setCabDriver] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);
  const navigate = useNavigate();
  const pdfRef = useRef();

  // Fetch driver data and assigned ads on component mount
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

  const downloadPDF = () => {
    const image = pdfRef.current.querySelector("img");

    if (image && !image.complete) {
      image.onload = () => generatePDF();
    } else {
      generatePDF();
    }
  };

  const generatePDF = () => {
    // html2pdf is a library for converting HTML to PDF.
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
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-950 to-black text-gray-200 font-inter">
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
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">Cab Driver Dashboard</h1>
              <p className="mt-1 text-gray-400">
                View your assigned ad campaigns and manage your availability.
              </p>
            </div>
          </div>
        </header>
        
        {/* Driver Info Card */}
        {cabDriver && (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 shadow-xl shadow-gray-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-900/50 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Driver Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <p><strong>Name:</strong> {cabDriver.name}</p>
              <p><strong>Email:</strong> {cabDriver.email}</p>
              <p><strong>Contact Number:</strong> {cabDriver.phoneNumber}</p>
              <p><strong>Vehicle Number:</strong> {cabDriver.vehicleNumber}</p>
              <p><strong>Platform:</strong> {cabDriver.platform}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-white">Availability Status:</span>
              <button
                onClick={toggleAvailability}
                className={`flex-grow-0 px-4 py-2 rounded-xl text-white font-medium transition-colors duration-300 ${
                  cabDriver.isAvailable ? "bg-green-600/30 text-green-400 hover:bg-green-600/50" : "bg-yellow-600/30 text-yellow-400 hover:bg-yellow-600/50"
                }`}
              >
                {cabDriver.isAvailable ? "Available" : "Not Available"}
              </button>
            </div>
          </div>
        )}

        {/* Assigned Ads Section */}
        <h2 className="text-2xl font-bold text-white mb-6 mt-12">📦 Assigned Ads</h2>

        {loading ? (
          <div className="p-8 bg-gray-900/50 rounded-2xl text-center border border-gray-800">
            <p className="text-gray-400 text-lg">Loading assigned ads...</p>
          </div>
        ) : assignedAds.length === 0 ? (
          <div className="p-8 bg-gray-900/50 rounded-2xl text-center border border-gray-800">
            <p className="text-gray-400 text-lg">No ads assigned yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedAds.map(ad => (
              <div 
                key={ad._id} 
                className="group bg-gray-900/50 rounded-2xl border border-gray-800 p-6 shadow-xl shadow-gray-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-900/50 cursor-pointer" 
                onClick={() => setSelectedAd(ad)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <FileText className="text-teal-400 group-hover:text-white transition-colors" size={32} />
                  <h3 className="text-lg font-bold text-white">{ad.adTitle}</h3>
                </div>
                <img 
                  src={ad.adImage} 
                  alt="Ad" 
                  className="w-full h-40 object-cover rounded-xl mb-4" 
                />
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-white">Company:</span> {ad.company?.companyName}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-white">Duration:</span> {ad.durationInDays} days
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-white">Pay:</span> ₹{ad.pricePerVehicle}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Expanded Ad */}
        {selectedAd && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl w-full max-w-2xl p-6 relative text-gray-200">
              <button onClick={() => setSelectedAd(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <div ref={pdfRef} className="max-h-[70vh] overflow-y-auto pr-2">
                <h2 className="text-2xl font-bold mb-2 text-white">{selectedAd.adTitle}</h2>
                <img 
                  src={selectedAd.adImage} 
                  alt="Ad" 
                  className="w-full object-contain rounded-xl mb-3" 
                  crossOrigin="anonymous" 
                />
                <p className="mb-4 text-gray-300">{selectedAd.description}</p>
                <p className="mb-1 text-gray-400">
                  <span className="font-semibold text-white">Company:</span> {selectedAd.company?.companyName}
                </p>
                <p className="mb-1 text-gray-400">
                  <span className="font-semibold text-white">Duration:</span> {selectedAd.durationInDays} days
                </p>
                <p className="mb-1 text-gray-400">
                  <span className="font-semibold text-white">Pay:</span> ₹{selectedAd.pricePerVehicle}
                </p>
              </div>
              <button
                onClick={downloadPDF}
                className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-900/70"
              >
                Download as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CabDriverDashboard;
