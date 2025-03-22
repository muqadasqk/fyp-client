import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute, AuthGuard, RoleGuard } from "@components";
import { AuthLayout, DashboardLayout } from "@layouts";
import { Signup, Signin, NotFound, UnAuthorized, ForgotPassword, Dashboard } from "@pages";

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
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> }
        ],
      },
    ],
  },

  { // role-base access control routes
    path: "/",
    element: <RoleGuard allowedRoles={["student"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/pitch-idea", element: <Dashboard /> }
        ],
      },
    ],
  },

  // unknown routes
  { path: "/unauthorized", element: <UnAuthorized /> },
  { path: "*", element: <NotFound /> }
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
