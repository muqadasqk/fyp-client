import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiRequest } from "@utils"

const initialState = {
    users: [],
    metadata: {},
    loading: false
}

export const retrieveUsers = createAsyncThunk("user/retrieveUsers",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await apiRequest.get("/users", {
                params,
                showSuccessToast: false,
            });
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
            .addCase(retrieveUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(retrieveUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.metadata = action.payload.metadata;
            })
            .addCase(retrieveUsers.rejected, (state) => {
                state.loading = false;
            })
    }
})

// export {} = userSlice.actions;
export default userSlice.reducer; 