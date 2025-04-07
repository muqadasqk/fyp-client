import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiRequest } from "@utils"

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

            // update status
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) =>
                    user._id === action.payload.user._id ? action.payload.user : user
                );
            })
            .addCase(updateStatus.rejected, (state) => {
                state.loading = false;
            })
    }
})

// export {} = userSlice.actions;
export default userSlice.reducer; 