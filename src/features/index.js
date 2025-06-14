// ui
export { default as uiReducer } from "./uiSlice"
export { setTheme, setLoading, setErrors, clearErrors } from "./uiSlice"

// auth
export { default as authReducer } from "./authSlice";
export { signup, confirmEmail, updateAuthenticatedUser, signin, signout, resetPassword, verifyOtp, sendOtp, verifyToken, clearEmailForOtp, clearResetPasswordToken } from "./authSlice";

// users
export { default as userReducer } from "./userSlice";
export { retrieveUsers, createUser, updateProfile, updatePassword, deleteUser, updateStatus } from "./userSlice";

//proposals
export { default as proposalReducer } from "./proposalSlice";
export { retrieveProposals, createProposal, updateProposal, retrieveManyProposal, deleteProposal } from "./proposalSlice";

//projects
export { default as projectReducer } from "./projectSlice";
export { retrieveProjects, createProject, updateProject, supervisorProjects, retrieveSingleProject, deleteProject } from "./projectSlice";

//presentations
export { default as presentationReducer } from "./presentationSlice";
export { retrievePresentations, createPresentation, updatePresentation, projectSpecificPresentations, getOnePresentation, deletePresentation } from "./presentationSlice";

//meetings
export { default as meetingsReducer } from "./meetingSlice";
export { retrieveMeetings, createMeeting, updateMeeting, projectSpecificMeeting, getOneMeeting, deleteMeeting } from "./meetingSlice";