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

import React, { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import GoogleLoginButton from "../components/GoogleLoginButton"; // ✅ Import here

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

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-white">
      <div className="w-[380px] backdrop-blur-md bg-white/30 rounded-3xl shadow-xl border border-white/30 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-xl shadow text-gray-700">
            <ShieldCheck size={26} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl text-center font-semibold text-gray-800 mb-1">
          Sign in with email
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Make a new doc to bring your words, data, and teams together. For
          free.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot?
            </span>
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full py-2 pl-3 pr-3 rounded-lg bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="cab-driver">Cab Driver</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Get Started
          </button>
        </form>

        {/* Divider */}
        <div className="text-sm text-gray-500 text-center mt-6">
          or sign in with
        </div>


        {/* Sign up link */}
        <div className="mt-6 text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
