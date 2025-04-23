import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiRequest, writeLocalStorage } from "@utils"
import { setErrors } from "./uiSlice";

const initialState = {
    users: [],
    pagination: {},
    loading: false
}

export const retrieveUsers = createAsyncThunk("user/retrieveUsers",
    async (page, { rejectWithValue }) => {
        try {
            const { data } = await apiRequest.post("/users/all", { page }, { showSuccessToast: false });
            return data;
        } catch (error) {
            return rejectWithValue(error.respone?.data);
        }
    }
)

export const createUser = createAsyncThunk("user/createUser",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await apiRequest.post("/users", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        } catch (error) {
            dispatch(setErrors(error.response?.data?.errors));
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateProfile = createAsyncThunk("user/updateProfile",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await apiRequest.patch("/users", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return response.data;
        } catch (error) {
            dispatch(setErrors(error.response?.data?.errors));
            return rejectWithValue(error.respone?.data);
        }
    }
)
export const updatePassword = createAsyncThunk("user/updatePassword",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await apiRequest.patch("/users/update-password", formData);
            return data;
        } catch (error) {
            dispatch(setErrors(error.response?.data?.errors));
            return rejectWithValue(error.respone?.data);
        }
    }
)

export const updateStatus = createAsyncThunk("user/updateStatus",
    async ({ id, statusCode }, { rejectWithValue }) => {
        try {
            const { data } = await apiRequest.patch(`/users/${id}`, { statusCode });
            return data;
        } catch (error) {
            return rejectWithValue(error.respone?.data);
        }
    }
)

const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // retrieve all
            .addCase(retrieveUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(retrieveUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.pagination = action.payload.pagination;
            })
            .addCase(retrieveUsers.rejected, (state) => {
                state.loading = false;
            })

            // create user
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [action.payload.user, ...state.users,];
            })
            .addCase(createUser.rejected, (state) => {
                state.loading = false;
            })

            // update profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                // writeLocalStorage("authenticatedUser", action.payload.user, true);
            })
            .addCase(updateProfile.rejected, (state) => {
                state.loading = false;
            })

            // update password
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updatePassword.rejected, (state) => {
                state.loading = false;
            })

            // update status
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user._id === action.payload.user._id);
                if (action.meta.arg.statusCode === 20002) {
                    state.users.splice(index, 1);
                } else {
                    state.users[index] = action.payload.user;
                }
            })
            .addCase(updateStatus.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default userSlice.reducer; 