import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest, deleteLocalStorage, readLocalStorage, showSuccessToast, writeLocalStorage } from "@utils";
import { setErrors } from "./uiSlice";

const initialState = {
  user: readLocalStorage("authenticatedUser", true),
  token: readLocalStorage("accessToken"),
  emailForOtp: readLocalStorage("emailForOtp"),
  resetPasswordToken: readLocalStorage("resetPasswordToken"),
  loading: false,
}

export const signup = createAsyncThunk("auth/signup",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiRequest.post("/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      dispatch(setErrors(error.response?.data?.errors));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const confirmEmail = createAsyncThunk("auth/confirmEmail",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiRequest.post("/auth/confirm-email", formData);
      return data;
    } catch (error) {
      dispatch(setErrors(error.response?.data?.errors));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const signin = createAsyncThunk("auth/signin",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiRequest.post("/auth/signin", credentials);
      return data;
    } catch (error) {
      dispatch(setErrors(error.response?.data?.errors));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk("auth/resetPassword",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiRequest.patch("/auth/reset-password", formData, {
        headers: { token: readLocalStorage("resetPasswordToken") },
      });
      return data;
    } catch (error) {
      dispatch(setErrors(error.response?.data?.errors));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const verifyOtp = createAsyncThunk("auth/verifyOtp",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiRequest.post("/auth/verify-otp", formData);
      return data;
    } catch (error) {
      dispatch(setErrors(error.response?.data?.errors));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const sendOtp = createAsyncThunk("auth/sendOtp",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiRequest.post("/auth/send-otp", formData);
      return data;
    } catch (error) {
      dispatch(setErrors(error.response?.data?.errors));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const verifyToken = createAsyncThunk("auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      if (!readLocalStorage("accessToken")) {
        throw new Error("Token not found");
      };
      const { data } = await apiRequest.get("/auth/verify-token", {
        showSuccessToast: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signout: (state) => {
      state.user = null;
      state.token = null;
      deleteLocalStorage("authenticatedUser", "accessToken");
      showSuccessToast("Singout successfully")
    },
    clearEmailForOtp: (state) => {
      state.emailForOtp = null;
      deleteLocalStorage("emailForOtp");
    },
    clearResetPasswordToken: (state) => {
      state.resetPasswordToken = null;
      deleteLocalStorage("resetPasswordToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        const formData = action.meta.arg;
        const email = formData instanceof FormData ? formData.get("email") : formData.email;
        state.emailForOtp = email;
        writeLocalStorage("emailForOtp", email);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
      })

      // confirm email
      .addCase(confirmEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmEmail.fulfilled, (state) => {
        state.loading = false;
        state.emailForOtp = null;
        deleteLocalStorage("emailForOtp");
      })
      .addCase(confirmEmail.rejected, (state) => {
        state.loading = false;
      })

      // signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        writeLocalStorage("authenticatedUser", user, true);
        writeLocalStorage("accessToken", token);
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false;
      })

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordToken = null;
        deleteLocalStorage("resetPasswordToken");
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      })

      // verify otp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        const { token } = action.payload;
        state.resetPasswordToken = token;
        writeLocalStorage("resetPasswordToken", token);
        state.emailForOtp = null;
        deleteLocalStorage("emailForOtp");
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.loading = false;
      })

      // send otp
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        const formData = action.meta.arg;
        const email = formData instanceof FormData ? formData.get("email") : formData.email;
        state.emailForOtp = email;
        writeLocalStorage("emailForOtp", email);
      })
      .addCase(sendOtp.rejected, (state) => {
        state.loading = false;
      })

      // verify token
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        deleteLocalStorage("authenticatedUser", "accessToken");
      })
  },
});

export const { update, signout, clearEmailForOtp, clearResetPasswordToken } = authSlice.actions;
export default authSlice.reducer;
