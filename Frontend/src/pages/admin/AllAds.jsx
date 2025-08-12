// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";

// const AllAds = () => {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     fetchAllAds();
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

//   const filteredAds =
//     filter === "All" ? ads : ads.filter((ad) => ad.status === filter);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "text-yellow-600";
//       case "Approved":
//         return "text-green-600";
//       case "Rejected":
//         return "text-red-600";
//       default:
//         return "text-gray-500";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 All Advertisements</h1>

//       <div className="flex gap-4 mb-6">
//         {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
//           <button
//             key={status}
//             className={`px-4 py-2 rounded-lg border text-sm font-semibold transition ${
//               filter === status
//                 ? "bg-blue-600 text-white border-blue-600"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//             }`}
//             onClick={() => setFilter(status)}
//           >
//             {status}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading ads...</p>
//       ) : filteredAds.length === 0 ? (
//         <p className="text-gray-500">No ads found for selected status.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredAds.map((ad) => (
//             <div
//               key={ad._id}
//               className="bg-white rounded-lg shadow border border-gray-200 p-5"
//             >
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">
//                     {ad.adTitle}
//                   </h3>
//                   <span
//                     className={`text-sm font-medium ${getStatusColor(ad.status)}`}
//                   >
//                     {ad.status}
//                   </span>
//                 </div>
//                 <img
//                   src={ad.adImage}
//                   alt="Ad"
//                   className="w-20 h-20 object-cover rounded-md border"
//                 />
//               </div>

//               <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
//               <div className="text-sm text-gray-700 space-y-1">
//                 <p>
//                   <strong>Company:</strong> {ad.company?.companyName}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {ad.company?.email}
//                 </p>
//                 <p>
//                   <strong>Vehicles Needed:</strong> {ad.totalVehicles}
//                 </p>
//                 <p>
//                   <strong>Price/Vehicle:</strong> ₹{ad.pricePerVehicle}
//                 </p>
//                 <p>
//                   <strong>Total:</strong> ₹{ad.totalAmount}
//                 </p>
//                 <p>
//                   <strong>Posted On:</strong>{" "}
//                   {new Date(ad.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               {ad.status === "Approved" && ad.assignedDrivers?.length > 0 && (
//                 <div className="mt-4 text-sm">
//                   <strong>Assigned Drivers:</strong>
//                   <ul className="list-disc pl-5 mt-1 text-gray-700">
//                     {ad.assignedDrivers.map((driver) => (
//                       <li key={driver._id}>
//                         {driver.name} — {driver.vehicleNumber} ({driver.platform})
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllAds;


// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const ITEMS_PER_PAGE = 4;

// const AllAds = () => {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedAd, setSelectedAd] = useState(null);

//   useEffect(() => {
//     fetchAds();
//   }, []);

//   const fetchAds = async () => {
//     try {
//       const res = await axiosInstance.get("/ad/admin/allAds");
//       setAds(res.data);
//     } catch (err) {
//       console.error("Error fetching ads:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredAds = ads.filter(ad => {
//     const matchesSearch = ad.adTitle.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "All" || ad.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const paginatedAds = filteredAds.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
//   const totalPages = Math.ceil(filteredAds.length / ITEMS_PER_PAGE);

//   const exportToCSV = () => {
//     const headers = ["Title", "Status", "Company", "Vehicles", "Price/Vehicle", "Total"];
//     const rows = filteredAds.map(ad => [
//       ad.adTitle,
//       ad.status,
//       ad.company?.companyName,
//       ad.totalVehicles,
//       ad.pricePerVehicle,
//       ad.totalAmount
//     ]);

//     const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
//     saveAs(blob, "ads_report.csv");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Ad Requests Report", 14, 15);
//     autoTable(doc, {
//       startY: 20,
//       head: [["Title", "Status", "Company", "Vehicles", "Price", "Total"]],
//       body: filteredAds.map(ad => [
//         ad.adTitle,
//         ad.status,
//         ad.company?.companyName,
//         ad.totalVehicles,
//         ad.pricePerVehicle,
//         ad.totalAmount
//       ])
//     });
//     doc.save("ads_report.pdf");
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 All Ads Management</h1>

//       {/* Filter and Export Options */}
//       <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="🔍 Search by title..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="px-4 py-2 border rounded w-full sm:w-64"
//         />

//         <select
//           value={statusFilter}
//           onChange={e => setStatusFilter(e.target.value)}
//           className="px-3 py-2 border rounded text-sm"
//         >
//           <option value="All">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//         </select>

//         <div className="flex gap-2">
//           <button onClick={exportToCSV} className="bg-blue-500 text-white px-4 py-2 rounded text-sm">Export CSV</button>
//           <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded text-sm">Export PDF</button>
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-gray-600">Loading ads...</p>
//       ) : paginatedAds.length === 0 ? (
//         <p className="text-gray-600">No ads found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {paginatedAds.map(ad => (
//             <div key={ad._id} className="bg-white p-4 rounded shadow border cursor-pointer hover:shadow-md" onClick={() => setSelectedAd(ad)}>
//               <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-xl font-semibold text-gray-800">{ad.adTitle}</h2>
//                 <span className={`text-sm font-medium px-2 py-1 rounded ${
//                   ad.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
//                   ad.status === "Approved" ? "bg-green-100 text-green-700" :
//                   "bg-red-100 text-red-700"
//                 }`}>
//                   {ad.status}
//                 </span>
//               </div>
//               <p className="text-gray-600 text-sm mb-2">{ad.description.slice(0, 100)}...</p>
//               <p className="text-sm text-gray-700"><strong>Company:</strong> {ad.company?.companyName}</p>
//               <p className="text-sm text-gray-700"><strong>Total Vehicles:</strong> {ad.totalVehicles}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-3 mt-6">
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white border"}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       {/* Ad Modal */}
//       {selectedAd && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg relative">
//             <button onClick={() => setSelectedAd(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
//             <h2 className="text-2xl font-bold mb-2">{selectedAd.adTitle}</h2>
//             <img src={selectedAd.adImage} alt="Ad" className="w-full h-48 object-cover mb-4 rounded" />
//             <p className="text-sm text-gray-700 mb-2">{selectedAd.description}</p>
//             <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {selectedAd.status}</p>
//             <p className="text-sm text-gray-600 mb-1"><strong>Company:</strong> {selectedAd.company?.companyName}</p>
//             <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {selectedAd.company?.email}</p>
//             <p className="text-sm text-gray-600 mb-1"><strong>Price/Vehicle:</strong> ₹{selectedAd.pricePerVehicle}</p>
//             <p className="text-sm text-gray-600 mb-1"><strong>Total Vehicles:</strong> {selectedAd.totalVehicles}</p>
//             <p className="text-sm text-gray-600 mb-3"><strong>Total Amount:</strong> ₹{selectedAd.totalAmount}</p>
//             {selectedAd.assignedDrivers?.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-semibold mb-1">Assigned Drivers:</h3>
//                 <ul className="text-sm list-disc pl-5">
//                   {selectedAd.assignedDrivers.map(driver => (
//                     <li key={driver._id}>{driver.name} - {driver.vehicleNumber} ({driver.platform})</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllAds;

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Search, ListFilter, Download, FileText, ArrowLeft, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 4;

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axiosInstance.get("/ad/admin/allAds");
      setAds(res.data);
    } catch (err) {
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.adTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedAds = filteredAds.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredAds.length / ITEMS_PER_PAGE);

  const exportToCSV = () => {
    const headers = ["Title", "Status", "Company", "Vehicles", "Price/Vehicle", "Total"];
    const rows = filteredAds.map(ad => [
      ad.adTitle,
      ad.status,
      ad.company?.companyName,
      ad.totalVehicles,
      ad.pricePerVehicle,
      ad.totalAmount
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "ads_report.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Inter", "normal");
    doc.setTextColor("#E2E8F0"); // Tailwind gray-200
    doc.setFillColor("#1A202C"); // Tailwind gray-900
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    doc.setFontSize(22);
    doc.setTextColor("#67E8F9"); // Tailwind cyan-400
    doc.text("Ad Requests Report", 14, 15);
    doc.setFontSize(10);
    autoTable(doc, {
      startY: 20,
      headStyles: {
        fillColor: "#334155", // Tailwind slate-700
        textColor: "#E2E8F0", // Tailwind gray-200
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: "#1F2937", // Tailwind gray-800
        textColor: "#E2E8F0", // Tailwind gray-200
      },
      alternateRowStyles: {
        fillColor: "#111827", // Tailwind gray-900
      },
      head: [["Title", "Status", "Company", "Vehicles", "Price", "Total"]],
      body: filteredAds.map(ad => [
        ad.adTitle,
        ad.status,
        ad.company?.companyName,
        ad.totalVehicles,
        ad.pricePerVehicle,
        ad.totalAmount
      ])
    });
    doc.save("ads_report.pdf");
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-950 to-black text-gray-200 font-inter">
      {/* Animated background overlay */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
      {/* Main Content */}
      <div className="z-10 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-sm">📋 All Ads Management</h1>

        {/* Filter and Export Options */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-xl shadow-gray-950/50">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-700 rounded-xl w-full text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <ListFilter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-700 rounded-xl text-sm w-full text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
            <button 
              onClick={exportToCSV} 
              className="flex-1 sm:flex-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-900/70"
            >
              <Download size={16} />
              <span>CSV</span>
            </button>
            <button 
              onClick={exportToPDF} 
              className="flex-1 sm:flex-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-900/70"
            >
              <Download size={16} />
              <span>PDF</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 bg-gray-900/50 rounded-2xl text-center border border-gray-800">
            <p className="text-gray-400 text-lg">Loading ads...</p>
          </div>
        ) : paginatedAds.length === 0 ? (
          <div className="p-8 bg-gray-900/50 rounded-2xl text-center border border-gray-800">
            <p className="text-gray-400 text-lg">No ads found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAds.map(ad => (
              <div 
                key={ad._id} 
                className="group bg-gray-900/50 rounded-2xl p-6 border border-gray-800 shadow-xl shadow-gray-950/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-900/50" 
                onClick={() => setSelectedAd(ad)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-white">{ad.adTitle}</h2>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    ad.status === "Pending" ? "bg-yellow-600/30 text-yellow-400" :
                    ad.status === "Approved" ? "bg-green-600/30 text-green-400" :
                    "bg-red-600/30 text-red-400"
                  }`}>
                    {ad.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{ad.description.slice(0, 100)}...</p>
                <div className="text-sm text-gray-400 space-y-1 mt-4">
                  <p><strong>Company:</strong> {ad.company?.companyName}</p>
                  <p><strong>Total Vehicles:</strong> <span className="font-semibold text-cyan-400">{ad.totalVehicles}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-xl bg-gray-800 text-gray-400 disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-xl bg-gray-800 text-gray-400 disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Ad Modal */}
        {selectedAd && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 w-full max-w-2xl p-6 rounded-2xl shadow-lg relative text-gray-200 border border-gray-800">
              <button onClick={() => setSelectedAd(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <h2 className="text-2xl font-bold mb-2 text-white">{selectedAd.adTitle}</h2>
              <img 
                src={selectedAd.adImage} 
                alt="Ad" 
                className="w-full h-48 object-cover mb-4 rounded-xl border border-gray-700" 
              />
              <p className="text-sm text-gray-400 mb-2">{selectedAd.description}</p>
              <div className="text-sm text-gray-400 space-y-1 mb-4">
                <p><strong>Status:</strong> <span className={`font-semibold ${selectedAd.status === "Pending" ? "text-yellow-400" : selectedAd.status === "Approved" ? "text-green-400" : "text-red-400"}`}>{selectedAd.status}</span></p>
                <p><strong>Company:</strong> {selectedAd.company?.companyName}</p>
                <p><strong>Email:</strong> {selectedAd.company?.email}</p>
                <p><strong>Price/Vehicle:</strong> <span className="font-semibold text-cyan-400">₹{selectedAd.pricePerVehicle}</span></p>
                <p><strong>Total Vehicles:</strong> <span className="font-semibold text-cyan-400">{selectedAd.totalVehicles}</span></p>
                <p><strong>Total Amount:</strong> <span className="font-semibold text-cyan-400">₹{selectedAd.totalAmount}</span></p>
              </div>
              {selectedAd.assignedDrivers?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-1 text-white">Assigned Drivers:</h3>
                  <ul className="text-sm list-disc pl-5 text-gray-400">
                    {selectedAd.assignedDrivers.map(driver => (
                      <li key={driver._id}>{driver.name} - {driver.vehicleNumber} ({driver.platform})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAds;
