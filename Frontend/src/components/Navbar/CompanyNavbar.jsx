import { Link } from "react-router-dom";

const CompanyNavbar = () => {
  return (
    <nav className="bg-white shadow-md text-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="text-2xl font-semibold text-blue-600">Company Panel</div>
      <div className="space-x-6 text-sm font-medium">
        <Link to="/company" className="hover:text-blue-600 transition-colors">
          Dashboard
        </Link>
        <Link to="/company/create-ad" className="hover:text-blue-600 transition-colors">
          Create Ad
        </Link>
        <Link to="/company/ads" className="hover:text-blue-600 transition-colors">
          My Ads
        </Link>
      </div>
    </nav>
  );
};

export default CompanyNavbar;
