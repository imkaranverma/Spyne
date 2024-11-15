import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from "redux-persist";
import { applyMiddleware } from "redux";

import authSlice, { AuthSliceInterface } from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import configSlice from "./slices/configSlice";
import { environment } from "../global_config";
import { MeInterface } from "../interface/AuthInterfaces";
import logger from "redux-logger";
import { ConfigInterface } from "src/interface/ConfigInterface";

const persistConfig = {
  key: `${environment}_ops_fe`,
  storage,
  whitelist: ["userSlice", "authSlice", "configSlice"]
};
export interface StoreInterface {
  userSlice: MeInterface.Response;
  authSlice: AuthSliceInterface;
  configSlice: ConfigInterface.Response;
}
const reducers = combineReducers<any>({
  userSlice,
  authSlice,
  configSlice
});
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // applyMiddleware(logger)
  middleware: (gDM) =>
    gDM({
      serializableCheck: false
    }).concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
export const persistor = persistStore(store);
