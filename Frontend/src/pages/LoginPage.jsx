// import React, { useState } from "react";
// import { Mail, Lock, Facebook, Apple, ShieldCheck, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../lib/axios";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "cab-driver", // default role
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const { email, password, role } = formData;

//   const roleToEndpoint = {
//     "company": "company",
//     "cab-driver": "cab-driver",
//     "admin": "admin",
//   };

//   const apiRolePath = roleToEndpoint[role];

//   try {
//     const response = await axiosInstance.post(`/auth/${apiRolePath}/login`, {
//       email,
//       password,
//     });

//     // ✅ Store role in localStorage
//     localStorage.setItem("role", role);

//     // ✅ Navigate to role-specific dashboard
//     if (role === "cab-driver") navigate("/cab-driver");
//     else if (role === "company") navigate("/company");
//     else if (role === "admin") navigate("/admin");

//     console.log("Login successful!", response.data);
//   } catch (error) {
//     console.error("Login error:", error.response?.data || error.message);
//     alert(
//       error.response?.data?.message ||
//         "Login failed. Please check credentials and role."
//     );
//   }
// };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-white">
//       <div className="w-[380px] backdrop-blur-md bg-white/30 rounded-3xl shadow-xl border border-white/30 p-8">
//         {/* Icon */}
//         <div className="flex justify-center mb-4">
//           <div className="bg-white p-3 rounded-xl shadow text-gray-700">
//             <ShieldCheck size={26} />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-xl text-center font-semibold text-gray-800 mb-1">
//           Sign in with email
//         </h2>
//         <p className="text-sm text-center text-gray-600 mb-6">
//           Make a new doc to bring your words, data, and teams together. For
//           free.
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
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
//             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 cursor-pointer">
//               Forgot?
//             </span>
//           </div>

//           {/* Role Dropdown */}
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full py-2 pl-3 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="cab-driver">Cab Driver</option>
//             <option value="company">Company</option>
//             <option value="admin">Admin</option>
//           </select>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Get Started
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="text-sm text-gray-500 text-center mt-6">
//           or sign in with
//         </div>

//         {/* Social Logins */}
//         <div className="flex justify-center mt-3 space-x-4">
//           <button className="bg-white p-2 rounded-full shadow">
//             <User size={18} className="text-gray-700" />
//           </button>
//           <button className="bg-white p-2 rounded-full shadow">
//             <Facebook size={18} className="text-blue-600" />
//           </button>
//           <button className="bg-white p-2 rounded-full shadow">
//             <Apple size={18} className="text-black" />
//           </button>
//         </div>

//         {/* Sign up link */}
//         <div className="mt-6 text-center text-sm text-gray-700">
//           Don&apos;t have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from "react";
// import { Mail, Lock, ShieldCheck } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../lib/axios";
// import GoogleLoginButton from "../components/GoogleLoginButton"; // ✅ Import here

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "cab-driver",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password, role } = formData;

//     const roleToEndpoint = {
//       company: "company",
//       "cab-driver": "cab-driver",
//       admin: "admin",
//     };

//     const apiRolePath = roleToEndpoint[role];

//     try {
//       const response = await axiosInstance.post(`/auth/${apiRolePath}/login`, {
//         email,
//         password,
//       });

//       localStorage.setItem("role", role);

//       if (role === "cab-driver") navigate("/cab-driver");
//       else if (role === "company") navigate("/company");
//       else if (role === "admin") navigate("/admin");

//       console.log("Login successful!", response.data);
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       alert(
//         error.response?.data?.message ||
//           "Login failed. Please check credentials and role."
//       );
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-white">
//       <div className="w-[380px] backdrop-blur-md bg-white/30 rounded-3xl shadow-xl border border-white/30 p-8">
//         {/* Icon */}
//         <div className="flex justify-center mb-4">
//           <div className="bg-white p-3 rounded-xl shadow text-gray-700">
//             <ShieldCheck size={26} />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-xl text-center font-semibold text-gray-800 mb-1">
//           Sign in with email
//         </h2>
//         <p className="text-sm text-center text-gray-600 mb-6">
//           Make a new doc to bring your words, data, and teams together. For
//           free.
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
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
//             <span
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 cursor-pointer"
//               onClick={() => navigate("/forgot-password")}
//             >
//               Forgot?
//             </span>
//           </div>

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full py-2 pl-3 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="cab-driver">Cab Driver</option>
//             <option value="company">Company</option>
//             <option value="admin">Admin</option>
//           </select>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Get Started
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="text-sm text-gray-500 text-center mt-6">
//           or sign in with
//         </div>


//         {/* Sign up link */}
//         <div className="mt-6 text-center text-sm text-gray-700">
//           Don&apos;t have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animations
import { axiosInstance } from "../lib/axios";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "cab-driver",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    const roleToEndpoint = {
      company: "company",
      "cab-driver": "cab-driver",
      admin: "admin",
    };

    const apiRolePath = roleToEndpoint[role];

    try {
      const response = await axiosInstance.post(`/auth/${apiRolePath}/login`, {
        email,
        password,
      });

      localStorage.setItem("role", role);

      if (role === "cab-driver") navigate("/cab-driver");
      else if (role === "company") navigate("/company");
      else if (role === "admin") navigate("/admin");

      console.log("Login successful!", response.data);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Login failed. Please check credentials and role."
      );
    }
  };

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
      <div className="absolute inset-0 z-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      <motion.div
        className="z-10 w-96 rounded-3xl border border-white/30 bg-white/10 p-10 shadow-2xl backdrop-blur-md"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        {/* Animated Icon */}
        <motion.div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ShieldCheck size={32} strokeWidth={2} />
        </motion.div>

        {/* Title and Subtitle */}
        <h2 className="mb-2 text-center text-3xl font-bold text-white drop-shadow-sm">
          Welcome Back
        </h2>
        <p className="mb-8 text-center text-sm text-gray-200">
          Sign in to your account to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-28 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot?
            </button>
          </motion.div>

          <motion.select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full cursor-pointer rounded-xl border border-white/20 bg-white/5 py-3 pl-4 pr-4 text-white backdrop-blur-sm transition-all duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <option value="cab-driver" className="bg-gray-800 text-white">
              Cab Driver
            </option>
            <option value="company" className="bg-gray-800 text-white">
              Company
            </option>
            <option value="admin" className="bg-gray-800 text-white">
              Admin
            </option>
          </motion.select>

          <motion.button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-sm text-gray-300">or sign in with</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        
        {/* Google Login Button */}
        <GoogleLoginButton />

        {/* Sign up link */}
        <p className="mt-8 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="font-semibold text-white transition-colors hover:text-teal-300 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
