// ui
export { default as uiReducer } from "./uiSlice"
export { setLoading, setErrors, clearErrors } from "./uiSlice"

// auth
export { default as authReducer } from "./authSlice";
export { signup, confirmEmail, updateAuthenticatedUser, signin, signout, resetPassword, verifyOtp, sendOtp, verifyToken, clearEmailForOtp, clearResetPasswordToken } from "./authSlice";

// users
export { default as userReducer } from "./userSlice";
export { retrieveUsers, createUser, updateProfile, updatePassword, updateStatus } from "./userSlice";

//proposals
export {default as proposalReducer} from "./proposalSlice";
export {retrieveProposals, createProposal, updateProposal, getOneProposal, deleteProposal} from "./proposalSlice";

//meetings
export {default as meetingsReducer} from "./meetingSlice";
export {retrieveMeetings, createMeeting, updateMeeting, projectSpecific,getOneMeeting,deleteMeeting} from "./meetingSlice";

//presentations
export {default as presentationReducer} from "./presentationSlice";
export {retrievePresentations, createPresentation, updatePresentation, projectSpecific, getOnePresentation, deletePresentation} from "./presentationSlice";

//projects
export {default as projectReducer} from "./projectSlice";
export {retrieveProjects, createProject, updateProject, supervisorSpecific, getOneProject, deleteProject} from "./projectSlice";