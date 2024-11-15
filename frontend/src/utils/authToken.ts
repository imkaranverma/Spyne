import { StorageConstants } from "../constants/storageConstants";

export const getStoredAuthToken = () => localStorage.getItem(StorageConstants.accessToken);
export const storeAuthToken = (token: { access: string; refresh: string }) => {
  console.log(token);
  localStorage.setItem(StorageConstants.accessToken, token.access);
  localStorage.setItem(StorageConstants.refreshToken, token.refresh);
};
export const storeConfigToken = (token: { business_id: string; business_logo: string; business_name: string }) => {
  console.log(token);
  localStorage.setItem(StorageConstants.business_id, token.business_id);
  localStorage.setItem(StorageConstants.business_logo, token.business_logo);
  localStorage.setItem(StorageConstants.business_name, token.business_name);
};

export const removeAuthToken = () => {
  localStorage.removeItem(StorageConstants.accessToken);
};

export const removeReduxPersistStorage = (key: string) => {
  localStorage.removeItem(key);
};
