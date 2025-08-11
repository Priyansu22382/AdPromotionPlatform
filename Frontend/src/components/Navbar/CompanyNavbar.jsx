// import { Link } from "react-router-dom";

// const CompanyNavbar = () => {
//   return (
//     <nav className="bg-white shadow-md text-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
//       <div className="text-2xl font-semibold text-blue-600">Company Panel</div>
//       <div className="space-x-6 text-sm font-medium">
//         <Link to="/company" className="hover:text-blue-600 transition-colors">
//           Dashboard
//         </Link>
//         <Link to="/company/create-ad" className="hover:text-blue-600 transition-colors">
//           Create Ad
//         </Link>
//         <Link to="/company/ads" className="hover:text-blue-600 transition-colors">
//           My Ads
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default CompanyNavbar;

import { Link, useNavigate } from "react-router-dom";
import { Gauge, PlusCircle, Folder, LogOut } from "lucide-react";
import { axiosInstance } from "../../lib/axios";

const CompanyNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/company/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gray-800/60 backdrop-blur-md text-gray-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 border-b border-gray-700 shadow-lg shadow-purple-900/50">
      <div className="flex items-center space-x-2 text-2xl font-bold text-white drop-shadow-sm mb-4 md:mb-0">
        <span className="text-purple-400">Company</span> Panel
      </div>
      <div className="flex flex-wrap justify-center space-x-4 text-sm font-medium">
        <Link
          to="/company"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          <Gauge size={18} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/company/create-ad"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          <PlusCircle size={18} />
          <span>Create Ad</span>
        </Link>
        <Link
          to="/company/ads"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          <Folder size={18} />
          <span>My Ads</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-900/70 active:scale-95"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default CompanyNavbar;
