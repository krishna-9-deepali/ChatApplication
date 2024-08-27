import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser: null,
    onlineUsers: null,
    searchUsers: null,
    isSearch: false,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSearchUsers: (state, action) => {
      state.searchUsers = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
  },
});
export const {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
  setOnlineUsers,
  setSearchUsers,
  setIsSearch,
} = userSlice.actions;
export default userSlice.reducer;
