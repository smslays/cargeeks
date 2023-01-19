import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../../shared/firebase/config";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    addLoggedUser: (state, { payload }) => payload,
    resetLoggedUser: () => ({}),
  },
});

export const { addLoggedUser, resetLoggedUser } = authSlice.actions;
export const selectLoggedUser = (state) => state.auth;
export default authSlice.reducer;
