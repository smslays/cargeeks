import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
const UserSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      return state;
    },
  },
});

export const { addUser } = UserSlice.actions;
export const selectUser = (state: RootState) => state?.users;
export default UserSlice.reducer;
