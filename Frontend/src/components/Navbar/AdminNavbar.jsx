import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600 tracking-wide">Admin Panel</div>
      <div className="space-x-6 text-gray-700 font-medium">
        <Link
          to="/admin"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/all-ads"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          All Ads
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
