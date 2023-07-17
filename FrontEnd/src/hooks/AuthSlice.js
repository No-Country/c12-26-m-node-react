import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showLogin: (state) => {
      state.show = true;
    },
    showRegister: (state) => {
      state.show = false;
    },
  },
});

export const { showLogin, showRegister } = AuthSlice.actions;
export default AuthSlice.reducer;
