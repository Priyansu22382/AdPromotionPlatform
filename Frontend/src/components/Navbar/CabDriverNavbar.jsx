import { Link } from "react-router-dom";

const CabDriverNavbar = () => {
  return (
    <nav className="bg-white shadow-md text-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="text-2xl font-semibold text-blue-600">Driver Panel</div>
      <div className="space-x-6 text-sm font-medium">
        <Link to="/cab-driver">Dashboard</Link>
      </div>
    </nav>
  );
};

export default CabDriverNavbar;