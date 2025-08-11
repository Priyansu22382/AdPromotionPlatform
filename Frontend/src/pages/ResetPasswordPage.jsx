import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Lock, ShieldCheck } from "lucide-react";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post(`/auth/reset-password/${token}`, { newPassword, role });
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-white">
      <div className="w-[400px] bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-white p-3 rounded-xl shadow text-gray-700">
            <ShieldCheck size={26} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Enter your new password below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
