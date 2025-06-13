import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoutes, AuthGuard } from "@components";
import { AuthLayout, DashboardLayout } from "@layouts";
import { Signup, Signin, NotFound, Unauthorized, ForgotPassword, Dashboard, ManageAccounts, ProfileSettings, Proposals, ManageProposals, ManageProjects, ManagePresentations } from "@pages";

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
          {
            path: "/accounts",
            children: [
              { path: 'admins', element: <ManageAccounts roleOrStatus="admin" key="admin" /> },
              { path: 'supervisors', element: <ManageAccounts roleOrStatus="supervisor" key="supervisor" /> },
              { path: 'students', element: <ManageAccounts roleOrStatus="student" key="student" /> },
              { path: 'pending', element: <ManageAccounts roleOrStatus="approvalPending" key="pending" /> },
              { path: 'rejected', element: <ManageAccounts roleOrStatus="rejected" key="rejected" /> },
            ]
          },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/proposals",
            children: [
              { path: 'conditionaly-accepted', element: <ManageProposals status="conditionallyAccepted" key="conditionallyAccepted" /> },
              { path: 'accepted', element: <ManageProposals status="accepted" key="accepted" /> },
              { path: 'pending', element: <ManageProposals status="pending" key="pending" /> },
              { path: 'rejected', element: <ManageProposals status="rejected" key="rejected" /> },
            ]
          },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/projects",
            children: [
              { path: 'initialized', element: <ManageProjects status="initialized" key="initialized" /> },
              { path: 'under-development', element: <ManageProjects status="underDevelopment" key="underDevelopment" /> },
              { path: 'completed', element: <ManageProjects status="completed" key="completed" /> },
            ]
          },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/presentations",
            children: [
              { path: 'pending-review', element: <ManagePresentations status="pendingReview" key="pendingReview" /> },
              { path: 'approved', element: <ManagePresentations status="approved" key="approved" /> },
              { path: 'rejected', element: <ManagePresentations status="rejected" key="rejected" /> },
            ]
          },
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
          { path: "/my-ideas", element: <Proposals /> }
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
