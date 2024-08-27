import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
    },
    logout: (state) => {
      state.status = false;
    },
  },
});

export const { login, logout } = authslice.actions;

export default authslice.reducer;
