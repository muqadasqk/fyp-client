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
export {default as proposalsReducer} from "./proposalSlice";
export {retrieveProposals, createProposal, getOneProposal, updateProposal,  deleteProposal} from "./proposalSlice";

//meetings
export {default as meetingsReducer} from "./meetingSlice";
export {retrieveMeetings, createMeeting, projectSpecific,getOneMeeting, updateMeeting, deleteMeeting} from "./meetingSlice"