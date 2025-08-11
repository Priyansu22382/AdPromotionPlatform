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


import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
    doc.text("Ad Requests Report", 14, 15);
    autoTable(doc, {
      startY: 20,
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 All Ads Management</h1>

      {/* Filter and Export Options */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-64"
        />

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded text-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <div className="flex gap-2">
          <button onClick={exportToCSV} className="bg-blue-500 text-white px-4 py-2 rounded text-sm">Export CSV</button>
          <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded text-sm">Export PDF</button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading ads...</p>
      ) : paginatedAds.length === 0 ? (
        <p className="text-gray-600">No ads found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paginatedAds.map(ad => (
            <div key={ad._id} className="bg-white p-4 rounded shadow border cursor-pointer hover:shadow-md" onClick={() => setSelectedAd(ad)}>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{ad.adTitle}</h2>
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  ad.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                  ad.status === "Approved" ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {ad.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{ad.description.slice(0, 100)}...</p>
              <p className="text-sm text-gray-700"><strong>Company:</strong> {ad.company?.companyName}</p>
              <p className="text-sm text-gray-700"><strong>Total Vehicles:</strong> {ad.totalVehicles}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-6">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white border"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Ad Modal */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg relative">
            <button onClick={() => setSelectedAd(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
            <h2 className="text-2xl font-bold mb-2">{selectedAd.adTitle}</h2>
            <img src={selectedAd.adImage} alt="Ad" className="w-full h-48 object-cover mb-4 rounded" />
            <p className="text-sm text-gray-700 mb-2">{selectedAd.description}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {selectedAd.status}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Company:</strong> {selectedAd.company?.companyName}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {selectedAd.company?.email}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Price/Vehicle:</strong> ₹{selectedAd.pricePerVehicle}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Total Vehicles:</strong> {selectedAd.totalVehicles}</p>
            <p className="text-sm text-gray-600 mb-3"><strong>Total Amount:</strong> ₹{selectedAd.totalAmount}</p>
            {selectedAd.assignedDrivers?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-1">Assigned Drivers:</h3>
                <ul className="text-sm list-disc pl-5">
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
  );
};

export default AllAds;
