import { uiReducer, authReducer, userReducer, proposalReducer, projectReducer, presentationReducer, meetingsReducer } from "@features";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
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
