import { createSlice } from "@reduxjs/toolkit";
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
export const useCurrentToken = (state: any) => state.auth.token;
export const useCurrentUser = (state: any) => state.auth.user;
export default authSlice.reducer;
