import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

//reducers
const setCredentials = (state, action) => {
  state.userInfo = action.payload;
  localStorage.setItem("userInfo", JSON.stringify(action.payload));
};

const logout = (state) => {
  state.userInfo = null;
  localStorage.removeItem("userInfo");
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   setCredentials,
   logout
  },
});

export const { setCredentials: setAuthCredentials, logout: logoutAuth } = authSlice.actions;

export default authSlice.reducer;
