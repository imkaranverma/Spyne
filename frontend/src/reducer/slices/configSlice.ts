import { createSlice } from "@reduxjs/toolkit";
import { removeAuthToken, removeReduxPersistStorage, storeAuthToken, storeConfigToken } from "../../utils/authToken";
import { environment } from "src/global_config";
export interface ConfigSliceInterfcae {
  business_id: number | null;
  business_name: string | null;
  business_logo: string | null;
}

const initialState: ConfigSliceInterfcae = {
  business_id: null,
  business_name: null,
  business_logo: null
};
const configSlice = createSlice({
  name: "configSlice",
  initialState,
  reducers: {
    setConfigData: (state, action) => {
      storeConfigToken(action.payload);
      state = action.payload;
      return state;
    },
    removeConfigData: (state) => {
      //   window.open("/login", "_self");
      state.business_logo = null;
      state.business_id = null;
      state.business_name = null;
      return state;
    }
  }
});

export const { setConfigData, removeConfigData } = configSlice.actions;

export default configSlice.reducer;
