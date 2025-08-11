import React, { useState } from "react";
import { Mail, Lock, Facebook, Apple, ShieldCheck, User, BadgeCheck, Car, Phone, Layers, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../lib/axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "company",
    vehicleNumber: "",
    platform: "",
    phoneNumber: "",
    companyName: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = "";
      
      // ✅ Fix: Use consistent role naming
      if (formData.role === "cab-driver") endpoint = "auth/cab-driver/signup";
      else if (formData.role === "company") endpoint = "auth/company/signup";

      const res = await axiosInstance.post(endpoint, formData);
      console.log("Signup Success:", res.data);

      // ✅ Save role in localStorage
      localStorage.setItem("role", formData.role);

      // Navigate based on role
      if (formData.role === "cab-driver") navigate("/cab-driver");
      else navigate("/company");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(err.response?.data.message || "Signup failed");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-white">
      <div className="w-[400px] backdrop-blur-md bg-white/30 rounded-3xl shadow-xl border border-white/30 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-xl shadow text-gray-700">
            <ShieldCheck size={26} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl text-center font-semibold text-gray-800 mb-1">
          Create an account
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Join our ad management platform and start exploring.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Role Selection */}
          <div className="relative">
            <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="company">Company</option>
              <option value="cab-driver">Cab Driver</option>
            </select>
          </div>

          {/* Additional Fields for Cab Driver */}
          {formData.role === "cab-driver" && (
            <>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="Vehicle Number"
                  required
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="platform"
                  placeholder="Platform (e.g., Uber, Rapido)"
                  required
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          )}

          {/* Additional Field for Company */}
          {formData.role === "company" && (
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

      </div>
    </div>
  );
};

export default SignupPage;