import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoutes, AuthGuard } from "@components";
import { AuthLayout, DashboardLayout } from "@layouts";
import { Signup, Signin, NotFound, Unauthorized, ForgotPassword, Dashboard, ManageAccounts, ProfileSettings, Proposals } from "@pages";

const router = createBrowserRouter([
  { // unprotected routes
    element: <AuthGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/signup", element: <Signup /> },
          { path: "/signin", element: <Signin /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
        ],
      }
    ]
  },

  { // protected routes
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/profile", element: <ProfileSettings /> },
        ],
      },
    ],
  },

  { // role-base access control routes (admin only)
    path: "/",
    element: <ProtectedRoutes allowedRoles={["admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/manage-accounts", element: <ManageAccounts /> },
          { path: "/manage-proposals", element: <ManageAccounts /> }
        ],
      },
    ],
  },

  { // role-base access control routes (student only)
    path: "/",
    element: <ProtectedRoutes allowedRoles={["student"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/proposals", element: <Proposals /> }
        ],
      },
    ],
  },

  // unknown routes
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> }
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
