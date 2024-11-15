import libertyIcon from "../src/assets/libertyIcon/icon.png";
import LOGO from "../src/assets/employee.png";
export const baseUrl: string | undefined = import.meta.env.VITE_API_ENDPOINT;
export const environment: string = import.meta.env.VITE_APP_ENV;

const businessConfig: { [key in "liberty" | "finnspire"]: { name: string; logo: string } } = {
  liberty: {
    name: "LIEBRTY PVT. LTD.",
    logo: libertyIcon
  },

  finnspire: {
    name: "FINNSPIRE PVT. LTD.",
    logo: LOGO
  }
};
export const usedBusinessConfig = businessConfig.liberty;
