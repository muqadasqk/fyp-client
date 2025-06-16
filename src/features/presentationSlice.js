import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setErrors } from "./uiSlice";
import { apiRequest } from "@utils";


const initialState = {
    presentations: [],
    pagination: {},
    loading: false,
    projects: [],
    presentation: null,
};

export const retrievePresentations = createAsyncThunk("presentation/retrievePresentations",
    async ({ page, status }, { rejectWithValue }) => {
        try {
            const { data } = await apiRequest.post(`/presentations/retrieve/${status}`, { page }, { showSuccessToast: false });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const createPresentation = createAsyncThunk("presentation/createPresentation",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await apiRequest.post("/presentations", formData, {
                headers: { "Content-Type": "application/json" }
            });

            return data;
        } catch (error) {
            dispatch(setErrors(error.response?.data?.errors));
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updatePresentation = createAsyncThunk("presentation/updatePresentation",
    async ({ id, updateData }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await apiRequest.patch(`/presentations/${id}`, updateData);
            return data;
        } catch (error) {
            dispatch(setErrors(error.response?.data?.errors));
            return rejectWithValue(error.response?.data);
        }
    }
);

export const projectSpecificPresentations = createAsyncThunk("presentation/projectSpecificPresentations",
    async ({ projectId, page }, { rejectWithValue }) => {
        try {
            const { data } = await apiRequest.post(`/presentations/p/${projectId}`, { page }, { showSuccessToast: false });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

export const getOnePresentation = createAsyncThunk(
    "presentation/getOnePresentation",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await apiRequest.get(`/presentations/${id}`, { showSuccessToast: false });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const deletePresentation = createAsyncThunk(
    "presentation/deletePresentation",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await apiRequest.delete(`/presentations/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const presentationSlice = createSlice({
    name: "presentations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(retrievePresentations.pending, (state) => {
                state.loading = true;
            })
            .addCase(retrievePresentations.fulfilled, (state, action) => {
                state.loading = false;
                state.presentations = action.payload.presentations;
                state.pagination = action.payload.pagination;
            })
            .addCase(retrievePresentations.rejected, (state) => {
                state.loading = false;
            })

            .addCase(createPresentation.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPresentation.fulfilled, (state, action) => {
                state.loading = false;
                state.presentations = [action.payload, ...state.presentations];
            })
            .addCase(createPresentation.rejected, (state) => {
                state.loading = false;
            })

            .addCase(updatePresentation.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePresentation.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.meta.arg;
                const index = state.presentations.findIndex((presentation) => presentation._id === id);
                if (index !== -1) {
                    state.presentations[index] = { ...action.payload.presentation };
                }
            })
            .addCase(updatePresentation.rejected, (state) => {
                state.loading = false;
            })

            .addCase(projectSpecificPresentations.pending, (state) => {
                state.loading = true;
            })
            .addCase(projectSpecificPresentations.fulfilled, (state, action) => {
                state.loading = false;
                state.pagination = action.payload.pagination;
                state.presentations = action.payload.presentations;
            })
            .addCase(projectSpecificPresentations.rejected, (state) => {
                state.loading = false;
            })

            .addCase(getOnePresentation.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOnePresentation.fulfilled, (state, action) => {
                state.loading = false;
                state.presentation = action.payload.presentation;
            })
            .addCase(getOnePresentation.rejected, (state) => {
                state.loading = false;
            })


            .addCase(deletePresentation.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePresentation.fulfilled, (state, action) => {
                state.loading = false;
                state.presentations = state.presentations.filter(
                    (presentation) => presentation._id !== action.payload._id
                );
            })
            .addCase(deletePresentation.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default presentationSlice.reducer;
