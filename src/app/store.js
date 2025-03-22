import { authReducer, uiReducer } from "@features";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
