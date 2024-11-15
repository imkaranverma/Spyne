import { createSlice } from "@reduxjs/toolkit";
import { removeAuthToken, removeReduxPersistStorage, storeAuthToken } from "../../utils/authToken";
import { environment } from "src/global_config";
export interface AuthSliceInterface {
  access: string | null;
  refresh: string | null;
}

const initialState: AuthSliceInterface = {
  access: null,
  refresh: null
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      storeAuthToken(action.payload);
      state = action.payload;
      return state;
    },
    removeAuthData: (state) => {
      removeAuthToken();
      window.open("/login", "_self");
      state.access = null;
      state.refresh = null;
      return state;
    }
  }
});

export const { setAuthData, removeAuthData } = authSlice.actions;

export default authSlice.reducer;
