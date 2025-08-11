import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import CompanyLayout from "./layouts/CompanyLayout";
import CabDriverLayout from "./layouts/CabDriverLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateAd from "./pages/company/CreateAd";
import CompanyAds from "./pages/company/CompanyAds";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import AllAds from "./pages/admin/AllAds";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CabDriverDashboard from "./pages/cabdriver/CabDriverDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import EditAd from "./pages/company/EditAd";

// ✅ ADD THESE IMPORTS
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <LoginPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> }, // ✅ NEW
        { path: "reset-password/:token", element: <ResetPasswordPage /> }, // ✅ NEW

      ],
    },
    {
      path: "/company",
      element: (
        <ProtectedRoute allowedRole="company">
          <CompanyLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <CompanyDashboard /> },
        { path: "create-ad", element: <CreateAd /> },
        { path: "ads", element: <CompanyAds /> },
        { path: "edit-ad/:id", element: <EditAd /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute allowedRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "all-ads", element: <AllAds /> },
      ],
    },
    {
      path: "/cab-driver",
      element: (
        <ProtectedRoute allowedRole="cab-driver">
          <CabDriverLayout />
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <CabDriverDashboard /> }],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
