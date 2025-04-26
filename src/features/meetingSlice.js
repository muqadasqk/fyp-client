import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { apiRequest } from "@utils";
import { setErrors } from "./uiSlice";
import { faL } from "@fortawesome/free-solid-svg-icons";


const initialState  = {
    meetings:[],
    pagination:{},
    loading:false,
    projectMeetings: [],
    meeting:null
}
 export const retrieveMeetings = createAsyncThunk("meeting/retrieveMeetings",
    async (page,{rejectWithValue}) => {
     try {
        const {data} = await apiRequest.post("/meetings/all", {page},{showSuccessToast:false});
        return data
     } catch (error) {
        return rejectWithValue(error.response?.data)
     }
    }
 )

 export const createMeeting = createAsyncThunk("meeting/createMeeting",
    async (formData, {rejectWithValue})=>{
        try {
            const {data} = await apiRequest.post("/meetings", formData, {
                headers:{"Content-type" : "application/json"}
            })
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
 )

 export const projectSpecific = createAsyncThunk("meeting/projectSpecific",
    async (id , {rejectWithValue}) =>{
        try {
            const {data} = await apiRequest.post(`/meetings/p/${id}`);
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
 )

 export const getOneMeeting = createAsyncThunk("meeting/getOneMeeting",
    async (id, {rejectWithValue})=>{
        try {
            const {data} = await apiRequest.get(`/meetings/${id}`);
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
 )

 export const updateMeeting = createAsyncThunk("meeting/updateMeeting",
    async ({id, updatedData}, {rejectWithValue}) =>{
        try {
            const {data} = await apiRequest.patch(`/meetings/${id}`,updatedData , {showSuccessToast:false});
            return (data)
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

export const deleteMeeting = createAsyncThunk("meeting/deleteMeeting",
    async (id, {rejectWithValue}) =>{
        try {
            const {data} = await apiRequest.delete(`/meetings/${id}`);
            return data
        }
        catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)
const meetingSlice = createSlice({
    name: "meetings",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(retrieveMeetings.pending, (state) => {
          state.loading = true;
        })
        .addCase(retrieveMeetings.fulfilled, (state, action) => {
          state.loading = false;
          state.meetings = action.payload.meetings;
          state.pagination = action.payload.pagination;
        })
        .addCase(retrieveMeetings.rejected, (state) => {
          state.loading = false;
        })
        .addCase(createMeeting.pending, (state) => {
            state.loading = true;
        })
        .addCase(createMeeting.fulfilled, (state, action) => {
            state.loading = false;
            state.meetings = [action.payload, ...state.meetings]
        })
        .addCase(createMeeting.rejected, (state) => {
         state.loading = false;
        })
        .addCase(projectSpecific.pending, (state)=>{
            state.loading = true;
        })
        .addCase(projectSpecific.fulfilled, (state, action)=>{
            state.loading = false;
            state.projectMeetings = action.payload.meetings
        })
        .addCase(projectSpecific.rejected, (state)=>{
            state.loading = false;
        })
        .addCase(getoneMeeting.pending, (state)=>{
            state.loading = true;
        })
        .addCase(getoneMeeting.fulfilled, (state, action)=>{
            state.loading = false;
            state.meeting = action.payload
        })
        .addCase(getoneMeeting.pending, (state)=>{
            state.loading = false
        })
        .addCase(updateMeeting.pending, (state)=>{
            state.loading = true;
        })
        .addCase(updateMeeting.fulfilled, (state, action)=>{
            state.loading = false;
            state.meeting = action.payload;
        })
        .addCase(updateMeeting.rejected, (state)=>{
            state.loading = false
        })
        .addCase(deleteMeeting.pending, (state)=>{
            state.loading = true;
        })
        .addCase(deleteMeeting.fulfilled, (state, action)=>{
            state.loading = false;
            state.meetings = state.meetings.filter((m) => m._id !== action.payload);
        })
        .addCase(deleteMeeting.rejected, (state)=>{
            state.loading = false;
        })
    }
  });
  export default meetingSlice.reducer;
 
  