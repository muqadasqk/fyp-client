// auth
export { default as Signup } from "./auth/Signup";
export { default as Signin } from "./auth/Signin";
export { default as ForgotPassword } from "./auth/ForgotPassword";

// protected
export { default as Dashboard } from "./protected/Dashboard";
export { default as ManageProjects } from "./protected/ManageProjects";
export { default as ManagePresentations } from "./protected/ManagePresentations";
export { default as ProfileSettings } from "./protected/ProfileSettings";

// protected>admin
export { default as ManageAccounts } from "./protected/admin/ManageAccounts";
export { default as ManageProposals } from "./protected/admin/ManageProposals";

// protected>supervisor
export { default as ManageMeetings } from "./protected/supervisor/ManageMeetings"

// protected>student
export { default as Proposals } from "./protected/student/Proposals";
export { default as MyProject } from "./protected/student/MyProject";

// static
export { default as NotFound } from "./static/NotFound";
export { default as Unauthorized } from "./static/Unauthorized";