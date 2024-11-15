import { createSlice } from "@reduxjs/toolkit";
import { MeInterface } from "../../interface/AuthInterfaces";
import { removeAuthToken } from "src/utils/authToken";

const initialState: MeInterface.Response | null = null;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action: { payload: any; type: string }) {
      state = action.payload;
      return state;
    },
    removeUser(state: any) {
      state = null;
      console.log(state);
      return state;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
