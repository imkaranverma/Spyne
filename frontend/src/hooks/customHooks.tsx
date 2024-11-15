import { useSelector } from "react-redux";
import { StoreInterface } from "../reducer/reducer";
import { MeInterface } from "../interface/AuthInterfaces";
import { AuthSliceInterface } from "../reducer/slices/authSlice";
import { ConfigInterface } from "src/interface/ConfigInterface";

export const useLoggedInUserData = () => {
  const userData = useSelector<StoreInterface, MeInterface.Response>((store) => store.userSlice);
  return { userData };
};

export const useAuthData = () => {
  const authData = useSelector<StoreInterface, AuthSliceInterface>((store) => store.authSlice);
  return { authData };
};

export const useConfigData = () => {
  const configData = useSelector<StoreInterface, ConfigInterface.Response>((store) => store.configSlice);
  return { configData };
};
