import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const ProtectedRoute = ({ allowedRole, children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosInstance.get(`/auth/${allowedRole}/check-Auth`);
        if (data.role === allowedRole) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error("Auth Check Failed:", err.response?.data || err.message);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [allowedRole]);

  if (loading) return <div>Loading...</div>;

  return authorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
