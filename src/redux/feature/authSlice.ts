import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
type User = {
  email: string;
  exp: number;
  first_name: string;
  iat: number;
  is_superuser: boolean;
  jti: string;
  last_name: string;
  token_type: string;
  user_id: number;
};

type TAuthState = {
  user: null | User;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
