import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest,deleteLocalStorage}  from "@utils";
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

export const deleteProposal = createAsyncThunk("proposal/deleteProposal",
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
         .addCase(createProposal.rejected, (state)=>{
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
            state.loading = true;
         })
         .addCase(updateProposal.fulfilled, (state,action)=>{
            state.loading = false;
           const index = state.proposals.findIndex((proposal) => proposal._id === action.meta.arg.id);
           if(action.meta.arg.statusCode  === 20001){
            if (index !== -1)
            state.proposals.splice(index, 1);
        } else {
            if (index !== -1){
                state.proposals[index] = {...action.payload.proposal}
            }
          
        }
         })
         .addCase(updateProposal.rejected, (state)=>{
            state.loading = false
         })
         .addCase(deleteProposal.pending, (state)=>{
            state.loading =  true;
         })
         .addCase(deleteProposal.fulfilled, (state,action)=>{
          state.loading = false;
          state.proposals = state.proposals.filter((p) => p._id !== action.payload)
         })
         .addCase(deleteProposal.rejected, (state)=>{
            state.loading = false;
         })
    }
    

});

export default proposalSlice.reducer