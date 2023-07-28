import { createSlice } from "@reduxjs/toolkit";
import { UserType, isUser } from "../types/UserType";

let initialState: { userInfo: UserType | null };

const cachedUser = localStorage.getItem("user");
const objectCachedUser = cachedUser ? JSON.parse(cachedUser) : null;
if (objectCachedUser && isUser(objectCachedUser)) {
  initialState = { userInfo: objectCachedUser };
} else {
  initialState = { userInfo: null };
}
export type UserStateType = typeof initialState;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: UserStateType,
      action: {
        payload: UserType;
        type: unknown;
      }
    ) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime.toString());
    },
    logout: (state: UserStateType) => {
      state.userInfo = null;
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
