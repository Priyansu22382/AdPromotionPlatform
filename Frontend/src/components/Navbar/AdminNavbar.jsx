// import { Link } from "react-router-dom";

// const AdminNavbar = () => {
//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       <div className="text-2xl font-bold text-blue-600 tracking-wide">Admin Panel</div>
//       <div className="space-x-6 text-gray-700 font-medium">
//         <Link
//           to="/admin"
//           className="hover:text-blue-600 transition-colors duration-200"
//         >
//           Dashboard
//         </Link>
//         <Link
//           to="/admin/all-ads"
//           className="hover:text-blue-600 transition-colors duration-200"
//         >
//           All Ads
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default AdminNavbar;

import { Link, useNavigate } from "react-router-dom";
import { Gauge, Folder, LogOut } from "lucide-react";
import { axiosInstance } from "../../lib/axios";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a POST request to the admin logout endpoint
      await axiosInstance.post("/auth/admin/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-black text-gray-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20 border-b border-gray-700 shadow-lg shadow-cyan-900/50">
      <div className="flex items-center space-x-2 text-2xl font-bold text-white drop-shadow-sm mb-4 md:mb-0">
        <span className="text-cyan-400">Admin</span> Panel
      </div>
      <div className="flex flex-wrap justify-center md:justify-end md:flex-row space-x-4 text-sm font-medium">
        <Link
          to="/admin"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          <Gauge size={18} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/all-ads"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          <Folder size={18} />
          <span>All Ads</span>
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

export default AdminNavbar;
