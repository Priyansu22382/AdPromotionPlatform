// import React, { useState } from "react";
// import { Mail, Lock, Facebook, Apple, ShieldCheck, User, BadgeCheck, Car, Phone, Layers, Building2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {axiosInstance} from "../lib/axios";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "company",
//     vehicleNumber: "",
//     platform: "",
//     phoneNumber: "",
//     companyName: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let endpoint = "";
      
//       // ✅ Fix: Use consistent role naming
//       if (formData.role === "cab-driver") endpoint = "auth/cab-driver/signup";
//       else if (formData.role === "company") endpoint = "auth/company/signup";

//       const res = await axiosInstance.post(endpoint, formData);
//       console.log("Signup Success:", res.data);

//       // ✅ Save role in localStorage
//       localStorage.setItem("role", formData.role);

//       // Navigate based on role
//       if (formData.role === "cab-driver") navigate("/cab-driver");
//       else navigate("/company");
//     } catch (err) {
//       console.error("Signup Error:", err.response?.data || err.message);
//       alert(err.response?.data.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-white">
//       <div className="w-[400px] backdrop-blur-md bg-white/30 rounded-3xl shadow-xl border border-white/30 p-8">
//         {/* Icon */}
//         <div className="flex justify-center mb-4">
//           <div className="bg-white p-3 rounded-xl shadow text-gray-700">
//             <ShieldCheck size={26} />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-xl text-center font-semibold text-gray-800 mb-1">
//           Create an account
//         </h2>
//         <p className="text-sm text-center text-gray-600 mb-6">
//           Join our ad management platform and start exploring.
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Role Selection */}
//           <div className="relative">
//             <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <select
//               name="role"
//               required
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="company">Company</option>
//               <option value="cab-driver">Cab Driver</option>
//             </select>
//           </div>

//           {/* Additional Fields for Cab Driver */}
//           {formData.role === "cab-driver" && (
//             <>
//               <div className="relative">
//                 <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   name="vehicleNumber"
//                   placeholder="Vehicle Number"
//                   required
//                   value={formData.vehicleNumber}
//                   onChange={handleChange}
//                   className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div className="relative">
//                 <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   name="platform"
//                   placeholder="Platform (e.g., Uber, Rapido)"
//                   required
//                   value={formData.platform}
//                   onChange={handleChange}
//                   className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   placeholder="Phone Number"
//                   required
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             </>
//           )}

//           {/* Additional Field for Company */}
//           {formData.role === "company" && (
//             <div className="relative">
//               <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 name="companyName"
//                 placeholder="Company Name"
//                 required
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Create Account
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from "react";
import { Mail, Lock, User, BadgeCheck, Car, Phone, Layers, Building2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { axiosInstance } from "../lib/axios";

// This is a placeholder for a custom modal component.
// You should replace the 'alert' calls with a custom modal for better UX.
const showErrorMessage = (message) => {
  console.error("Signup Error:", message);
  // alert(message); // Replaced with a custom solution
};

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
      
      // Determine the correct API endpoint based on the selected role
      if (formData.role === "cab-driver") {
        endpoint = "auth/cab-driver/signup";
      } else if (formData.role === "company") {
        endpoint = "auth/company/signup";
      }

      // Make the API call to the backend
      const res = await axiosInstance.post(endpoint, formData);
      console.log("Signup Success:", res.data);

      // Save the role in local storage
      localStorage.setItem("role", formData.role);

      // Navigate based on the role
      if (formData.role === "cab-driver") {
        navigate("/cab-driver");
      } else {
        navigate("/company");
      }
    } catch (err) {
      // Handle errors and show a user-friendly message (e.g., using a custom modal)
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      showErrorMessage(errorMessage);
    }
  };

  // Framer Motion variants for the main container animation
  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      {/* Animated background overlay */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      {/* Main content container with a spring animation */}
      <motion.div
        className="z-10 w-96 rounded-3xl border border-white/30 bg-white/10 p-10 shadow-2xl backdrop-blur-md"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        {/* Animated icon */}
        <motion.div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ShieldCheck size={32} strokeWidth={2} />
        </motion.div>

        {/* Title and subtitle */}
        <h2 className="mb-2 text-center text-3xl font-bold text-white drop-shadow-sm">
          Create an account
        </h2>
        <p className="mb-8 text-center text-sm text-gray-200">
          Join our ad management platform and start exploring.
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </motion.div>

          {/* Role Selection */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            >
              <option value="company" className="bg-gray-800 text-white">Company</option>
              <option value="cab-driver" className="bg-gray-800 text-white">Cab Driver</option>
            </select>
          </motion.div>

          {/* Additional Fields for Cab Driver - animated conditional rendering */}
          {formData.role === "cab-driver" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="Vehicle Number"
                  required
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </motion.div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="platform"
                  placeholder="Platform (e.g., Uber, Rapido)"
                  required
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </motion.div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Additional Field for Company - animated conditional rendering */}
          {formData.role === "company" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Submit button with animations */}
          <motion.button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Account
          </motion.button>
        </form>

        {/* Link to login page */}
        <p className="mt-8 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-white transition-colors hover:text-teal-300 hover:underline"
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
