import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, type User } from "@/api/auth";
import { tokenStorage } from "@/api/tokenStorage";
import type { RootState } from "@/store";

type AuthStatus = "idle" | "authenticated" | "guest";

type AuthState = {
  bootstrapped: boolean;
  status: AuthStatus;
  user: User | null;
  error: string | null;
};

const initialState: AuthState = {
  bootstrapped: false,
  status: "idle",
  user: null,
  error: null,
};

async function loadCurrentUserOrNull() {
  const tokens = await tokenStorage.get();
  if (!tokens?.accessToken) return null;
  return authApi.getCurrentUser();
}

export const bootstrapAuth = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/bootstrap", async (_, { rejectWithValue }) => {

  try {
      const user = await loadCurrentUserOrNull();
      return user;
    } catch {
      await tokenStorage.clear();
      return rejectWithValue("TOKEN_INVALID");
    }
});

export const login = createAsyncThunk<
  User,
  { account: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ account, password }, { rejectWithValue }) => {
  try {
    const user = await authApi.login({ account, password });
    return user;
  }catch (e: any) {
    console.log("LOGIN ERROR:", {
      message: e?.message,
      code: e?.code,
      status: e?.response?.status,
      data: e?.response?.data,
      url: e?.config?.url,
      baseURL: e?.config?.baseURL,
    });
    return rejectWithValue("LOGIN_FAILED");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
  return true;
});

export const refreshCurrentUser = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/refreshCurrentUser", async (_, { rejectWithValue }) => {
  
  try {
    const user = await loadCurrentUserOrNull();
    return user;
  } catch {
    await tokenStorage.clear();
    return rejectWithValue("TOKEN_INVALID");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // bootstrap
      .addCase(bootstrapAuth.pending, (state) => {
        state.error = null;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.bootstrapped = true;

        const user = action.payload;
        state.user = user;
        state.status = user ? "authenticated" : "guest";
      })
      .addCase(bootstrapAuth.rejected, (state, action) => {
        state.bootstrapped = true;
        state.user = null;
        state.status = "guest";
        state.error = null; 
      })

      // login
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.status = "guest";
        state.error = action.payload ?? "LOGIN_FAILED";
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "guest";
        state.error = null;
      })

      // refreshCurrentUser
      .addCase(refreshCurrentUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
        state.status = user ? "authenticated" : "guest";
      })
      .addCase(refreshCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.status = "guest";
        state.error = action.payload ?? "TOKEN_INVALID";
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;

// selectors
export const selectAuth = (s: RootState) => s.auth;
export const selectBootstrapped = (s: RootState) => s.auth.bootstrapped;
export const selectIsAuthenticated = (s: RootState) =>
  s.auth.status === "authenticated";
export const selectUser = (s: RootState) => s.auth.user;
export const selectAuthError = (s: RootState) => s.auth.error;