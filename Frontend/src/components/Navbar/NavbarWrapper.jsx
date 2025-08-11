import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import CompanyNavbar from "./CompanyNavbar";
import AdminNavbar from "./AdminNavbar";
import CabDriverNavbar from "./CabDriverNavbar";

const NavbarWrapper = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedRole = localStorage.getItem("role");
      console.log("🔍 Stored role from localStorage:", storedRole);
      
      if (!storedRole) {
        console.log("❌ No role found in localStorage");
        setLoading(false);
        return;
      }

      try {
        console.log("🚀 Making auth check request to:", `/auth/${storedRole}/check-Auth`);
        const { data } = await axiosInstance.get(`/auth/${storedRole}/check-Auth`);
        console.log("✅ Auth Check Response:", data);
        
        if (data.role === storedRole) {
          console.log("✅ Role verified, setting role:", storedRole);
          setRole(storedRole);
        } else {
          console.log("❌ Role verification failed");
          console.log("Expected role:", storedRole);
          console.log("Received role:", data.role);
          console.log("Success flag:", data.success);
        }
      } catch (err) {
        console.error("❌ Auth check failed:", err.response?.data || err.message);
        // Let's still try to show the navbar even if auth check fails
        console.log("🔄 Setting role anyway for debugging:", storedRole);
        setRole(storedRole);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  console.log("🎯 Current state - Role:", role, "Loading:", loading);

  if (loading) {
    return <div className="bg-yellow-200 p-4 text-center">Loading navbar...</div>;
  }

  if (!role) {
    return <div className="bg-red-200 p-4 text-center">No role found</div>;
  }

  console.log("🎨 Rendering navbar for role:", role);

  if (role === "admin") {
    console.log("🔧 Rendering AdminNavbar");
    return <AdminNavbar />;
  }
  if (role === "company") {
    console.log("🏢 Rendering CompanyNavbar");
    return <CompanyNavbar />;
  }
  if (role === "cab-driver") {
    console.log("🚗 Rendering CabDriverNavbar");
    return <CabDriverNavbar />;
  }

  // ✅ fallback to show what role we have
  return (
    <div className="bg-red-200 p-4 text-center">
      Unknown role: {role} (This shouldn't happen)
    </div>
  );
};

export default NavbarWrapper;