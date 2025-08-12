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

**Environment Variables**  
- PORT=5001
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_secret_key
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret
---

**API Endpoints**

**Authentication Routes**
| Method | Endpoint                          | Description                 |
| ------ | --------------------------------- | --------------------------- |
| POST   | `/api/auth/company/signup`        | Register a new company      |
| POST   | `/api/auth/cab-driver/signup`     | Register a new cab driver   |
| POST   | `/api/auth/login`                 | Login for company or driver |
| GET    | `/api/auth/google`                | Google OAuth login          |
| POST   | `/api/auth/forgot-password`       | Send reset email            |
| POST   | `/api/auth/reset-password/:token` | Reset password              |

**Campaign Routes**

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/campaigns`        | Create new campaign       |
| GET    | `/api/campaigns`        | Get all campaigns         |
| PUT    | `/api/campaigns/:id`    | Update a campaign         |
| DELETE | `/api/campaigns/:id`    | Delete a campaign         |
| POST   | `/api/campaigns/assign` | Assign campaign to driver |


**Cab Driver Routes**

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| POST   | `/api/cab-driver/upload-docs`  | Upload driver documents  |
| GET    | `/api/cab-driver/campaigns`    | Get assigned campaigns   |
| POST   | `/api/cab-driver/download-pdf` | Download ad creative PDF |


---


**Project Structure**

AdPromotion/
│
├── backend/
│   ├── config/         # Database & Passport setup
│   ├── controllers/    # API business logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── lib/            # Utilities (email, pdf, etc.)
│   ├── server.js       # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── pages/      # Page-level components
│   │   ├── components/ # UI components
│   │   ├── lib/        # Axios API client
│
└── README.md
---
