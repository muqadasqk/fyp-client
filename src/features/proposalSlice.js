import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest}  from "@utils";
import { setErrors } from "./uiSlice";


const initialState = {
    proposals :[],
    pagination:{},
    loading:false,
    getOneProposal:null
}

export const retrieveProposals = createAsyncThunk("proposal/retrieveProposals",
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await apiRequest.post("/proposals/all", {page},{showSuccessToast:false});
            return data;
        } catch (error){
            return rejectWithValue(error.response?.data);
        }
    }
)

export const createProposal = createAsyncThunk("proposal/createProposal",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const {data} = await apiRequest.post("/proposals",formData,{
                headers:{"Content-Type":"application/json"}
            });
            return data;
        } catch (error) {
            dispatch(setErrors(error.response?.data?.errors));
            return rejectWithValue(error.response?.data);
        }
    }
)

export const getOneProposal = createAsyncThunk("proposal/getOneProposal",
   async (id,{rejectWithValue})=>{
    try {
        const {data} = await apiRequest.get(`/proposals/${id}`,{showSuccessToast:false});
            return data
    
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
   }
)

export const updateProposal = createAsyncThunk("proposal/updateProposal",
    async({id,statusCode},{rejectWithValue})=>{
        try {
            const {data} = await apiRequest.patch(`/proposals/${id}`,{statusCode});
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

export const deletProposla = createAsyncThunk("proposal/deleteProposal",
    async(id,{rejectWithValue})=>{
        try {
            const {data} = await apiRequest.delete(`/proposals/${id}`)
            return  data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)
const proposalSlice = createSlice({
    name:"proposals",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(retrieveProposals.pending, (state)=>{
           state.loading = true;
        })
        .addCase(retrieveProposals.fulfilled, (state,action)=>{
            state.loading = false;
            state.proposals = action.payload.proposals;
            state.pagination = action.payload.pagination
        })
        .addCase(retrieveProposals.rejected, (state)=>{
          state.loading = false
        })
        .addCase(createProposal.pending, (state)=>{
            state.loading = true;
         })
         .addCase(createProposal.fulfilled, (state,action)=>{
            state.loading = false;
            state.proposals = [action.payload, ...state.proposals];
         })
         .addCase(createProposal.pending, (state)=>{
            state.loading = false;
         })
         .addCase(getOneProposal.pending, (state)=>{
            state.loading =  true;
         })
         .addCase(getOneProposal.fulfilled, (state,action)=>{
            state.loading = false;
            state.getOneProposal = action.payload;
         })
         .addCase(getOneProposal.rejected, (state)=>{
            state.loading =  false
         })
         .addCase(updateProposal.pending, (state)=>{
            state.loading = false;
         })
         .addCase(updateProposal.fulfilled, (state,action)=>{
            state.loading = false;
            state.updateProposal = action.payload
         })
    }

})