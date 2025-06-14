// auth
export { default as Signup } from "./auth/Signup";
export { default as Signin } from "./auth/Signin";
export { default as ForgotPassword } from "./auth/ForgotPassword";

// protected
export { default as Dashboard } from "./protected/Dashboard";
export { default as ProfileSettings } from "./protected/ProfileSettings";

// protected>admin
export { default as ManageAccounts } from "./protected/admin/ManageAccounts";
export { default as ManageProposals } from "./protected/admin/ManageProposals";
export { default as ManageProjects } from "./protected/admin/ManageProjects";
export { default as ManagePresentations } from "./protected/admin/ManagePresentations";

// protected>student
export { default as Proposals } from "./protected/student/Proposals";
export { default as MyProject } from "./protected/student/MyProject";

// static
export { default as NotFound } from "./static/NotFound";
export { default as Unauthorized } from "./static/Unauthorized";