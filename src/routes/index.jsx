import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute, AuthGuard, RoleGuard } from "@components";

// Public Pages
import Signin from "@pages/auth/Signin";
import Signup from "@pages/auth/Signup";
import AdminSignin from "@pages/auth/AdminSignin";
import SendOtp from "@pages/auth/SendOtp";
import VerifyOtp from "@pages/auth/VerifyOtp";
import VerifyEmail from "@pages/auth/VerifyEmail";
import ResetPassword from "@pages/auth/ResetPassword";

// Protected Pages
import DashboardLayout from "@layouts/DashboardLayout";
import DashboardHome from "@pages/dashboard/Home";
import UserProfile from "@pages/dashboard/UserProfile";
import ManageUsers from "@pages/dashboard/ManageUsers";

// Admin Pages
import AdminDashboard from "@pages/admin/AdminDashboard";
import ManageAdmins from "@pages/admin/ManageAdmins";
import ManageAllUsers from "@pages/admin/ManageAllUsers";
import NotFound from "@pages/NotFound";
import { AuthLayout } from "@layouts";

const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/signin", element: <Signin /> },
          { path: "/signup", element: <Signup /> },
          { path: "/admin-signin", element: <AdminSignin /> },
          { path: "/send-otp", element: <SendOtp /> },
          { path: "/verify-otp", element: <VerifyOtp /> },
          { path: "/verify-email", element: <VerifyEmail /> },
          { path: "/reset-password", element: <ResetPassword /> },
        ],
      }
    ]
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "profile", element: <UserProfile /> },
          { path: "manage-users", element: <ManageUsers /> },
        ],
      },
    ],
  },

  {
    element: <RoleGuard allowedRoles={["admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "manage-all-users", element: <ManageAllUsers /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
