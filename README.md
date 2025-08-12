# 🚖 AdPromotionPlatform  

An innovative **full-stack MERN** platform designed to connect **companies** with **cab drivers** for advertising campaigns. Admins manage ad requests, assign them to available drivers, and track engagement — all in one place.  

![AdPromotionPlatform Banner](https://your-banner-image-link.com)  

---

## 📜 Table of Contents  
- [✨ Features](#-features)  
- [🛠 Tech Stack](#-tech-stack)  
- [📂 Project Structure](#-project-structure)  
- [⚙️ Installation](#️-installation)  
- [🚀 Usage](#-usage)  
- [🔐 Authentication & Roles](#-authentication--roles)  
- [📸 Screenshots](#-screenshots)  
- [🤝 Contributing](#-contributing)  
- [📄 License](#-license)  

---

## ✨ Features  

### 👨‍💼 **Admin**  
- View, approve, reject, and delete ad requests  
- Assign approved ads to available cab drivers  
- Manage cab driver availability and details  

### 🏢 **Company**  
- Submit ad requests with media and details  
- Edit or delete pending requests  
- View status updates in real time  

### 🚖 **Cab Driver**  
- Accept assigned ads  
- Track assigned campaigns  
- Upload verification documents  

---

## 🛠 Tech Stack  

**Frontend**  
- ⚛️ React.js (Vite)  
- 🎨 Tailwind CSS (Responsive UI)  

**Backend**  
- 🟢 Node.js + Express.js  
- 📦 MongoDB (Mongoose ODM)  

**Authentication & Security**  
- 🔑 JWT (Role-based authentication)  
- 🛡 bcrypt (Password hashing)  

**Others**  
- ☁ Cloudinary (Image/Document Uploads)  
- 📡 Axios (API communication)  

---

## 📂 Project Structure  

AdPromotionPlatform/
│
├── backend/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│
└── README.md
