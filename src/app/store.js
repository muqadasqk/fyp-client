import { uiReducer, authReducer, userReducer, proposalReducer } from "@features";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        users: userReducer,
        proposals: proposalReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
