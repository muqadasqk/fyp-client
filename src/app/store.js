import { uiReducer, authReducer, userReducer, proposalReducer, projectReducer, presentationReducer, meetingsReducer, notificationReducer } from "@features";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        ui: uiReducer,
        auth: authReducer,
        users: userReducer,
        proposals: proposalReducer,
        projects: projectReducer,
        presentations: presentationReducer,
        meetings: meetingsReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
