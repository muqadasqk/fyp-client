import { configureStore } from "@reduxjs/toolkit";

// configure and export store
export const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});
