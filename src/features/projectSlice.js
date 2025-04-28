import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "@utils";
import { setErrors } from "./uiSlice";
const initialState = {
    projects: [],
    pagination: {},
    loading: false,
    supervisor: [],
    project:null
}
export  const retrieveProjects =  createAsyncThunk("projects/retrieveProjects",
    async (page , {rejectWithValue}) => {
  try {
     const {data} = await apiRequest.post("/projects/all", {page} , {showSuccessToast:false},{
        headers : {}
     })
     return data;

  } catch (error) {
    return rejectWithValue(error.response?.data)
  }
    }
)

export const createProject = createAsyncThunk("project/createProject",
    async (formData , {rejectWithValue, dispatch}) =>{
        try {
            const {data} = await apiRequest.post("/projects" , formData,{
                headers: {"Content-Type" : "application/json"}
            })
            return data
        } catch (error) {
            dispatch (setErrors(error.response?.data?.errors))
            return  rejectWithValue(error.response?.data)
        }
    }
)

export const updateProject = createAsyncThunk("project/updateproject" ,
    async ({id, updatedData}, {rejectWithValue, dispatch})=>{
        try {
            const {data} = await apiRequest.patch(`/projects/${id}`, updatedData)
            return data 
        } catch (error) {
            dispatch(setErrors(error.response?.data?.errors));
            return rejectWithValue(error.response?.data)
        }
    }

)

export const supervisorSpecific = createAsyncThunk("project/supervisorSpecific",
    async (id, {rejectWithValue}) =>{
        try {
            const {data} = await apiRequest.post(`/projects/s/${id}`,  {showSuccessToast:false})
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

export const getOneProject = createAsyncThunk("project/getOneSpecific",
    async  (id, {rejectWithValue}) =>{
        try {
            const {data} = await apiRequest.get(`/projects/${id}`, {showSuccessToast: false})
            return data
        } catch (error) {
           return rejectWithValue(error.response?.data) 
        }
    }
)

export  const deleteProject = createAsyncThunk("project/deleteproject",
    async (id, {rejectWithValue}) =>{
        try {
            const {data} = await apiRequest.delete(`/projects/${id}`)
            return data
        } catch (error) {
          return rejectWithValue(error.response?.data)  
        }
    }

)

const projectSlice = createSlice({
    name:"project",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(retrieveProjects.pending, (state)=>{
            state.loading = true;
        })
        .addCase(retrieveProjects.fulfilled, (state, action)=>{
            state.loading = false;
            state.projects = action.payload.projects;
            state.pagination =  action.payload.pagination
        })
        .addCase(retrieveProjects.rejected, (state)=>{
            state.loading =  false
        })

        .addCase(createProject.pending, (state)=>{
            state.loading = true;
        })
        .addCase(createProject.fulfilled, (state, action)=>{
            state.loading = false;
            state.projects = [action.payload , ...state.projects]
        })
        .addCase(createProject.rejected, (state)=>{
            state.loading = false;
        })
        
        .addCase(updateProject.pending, (state)=>{
            state.loading = false; 
        })
        .addCase(updateProject.fulfilled, (state, action)=>{
            const index = state.projects.findIndex(project => project._id === action.payload._id);
            if (index !== -1){
                state.projects[index] = action.payload
            }
        })
        .addCase(updateProject.rejected, (state)=>{
            state.loading =  false;
        })

        .addCase(supervisorSpecific.pending, (state)=>{
            state.loading = true;
        })
        .addCase(supervisorSpecific.fulfilled, (state, action)=>{
            state.loading = false;
            state.supervisor = action.payload.projects;
           
        })
        .addCase(supervisorSpecific.rejected, (state)=>{
            state.loading =  false
        })

        .addCase(getOneProject.pending, (state)=>{
            state.loading = true;
        })
        .addCase(getOneProject.fulfilled, (state, action)=>{
            state.loading = false;
            state.projects = action.payload.projects;
          
        })
        .addCase(getOneProject.rejected, (state)=>{
            state.loading =  false
        })

        .addCase(deleteProject.pending, (state)=>{
            state.loading = true;
        })
        .addCase(deleteProject.fulfilled, (state, action)=>{
            state.loading = false;
           state.projects = state.projects.filter((project) => project._id !== action.payload._id)
        })
        .addCase(deleteProject.rejected, (state)=>{
            state.loading =  false
        })


    }
})
export default projectSlice.reducer