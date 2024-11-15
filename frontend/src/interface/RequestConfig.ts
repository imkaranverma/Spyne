import { AxiosProgressEvent, AxiosRequestConfig, GenericAbortSignal } from "axios";

export type HttpHeaders = {
  [key: string]: string;
};
export interface RequestConfig extends AxiosRequestConfig {
  headers?: HttpHeaders;
  showDefaultError?: boolean;
  signal?: GenericAbortSignal | undefined;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
