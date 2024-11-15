import axios, { AxiosError, AxiosInstance } from "axios";

import qs from "qs";
import { RequestConfig } from "../interface/RequestConfig";
import { baseUrl } from "../global_config";
import { getStoredAuthToken, removeAuthToken } from "../utils/authToken";
import { ToasterService } from "src/services/ToasterService";
import { removeAuthData } from "src/reducer/slices/authSlice";
import { removeUser } from "src/reducer/slices/userSlice";

export interface IApiClient {
  post<TRequest, TResponse>(path: string, object: TRequest, config?: RequestConfig): Promise<TResponse>;
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  get<TResponse>({ path, queryParam }: { path: string; queryParam?: {} }): Promise<TResponse>;
  delete<TResponse>(path: string, config?: RequestConfig): Promise<TResponse>;
}

class ApiClient implements IApiClient {
  private client: AxiosInstance;

  // eslint-disable-next-line class-methods-use-this
  protected createAxiosClient(): AxiosInstance {
    return axios.create({
      baseURL: baseUrl,
      responseType: "json" as const,
      // withCredentials:false,

      headers: {
        "Content-Type": "application/json",
        // "ngrok-skip-browser-warning":true,
        "User-Agent": "dsfjasdfjalsdf"
        // ...(apiConfiguration?.accessToken && {
        //   Authorization: `Bearer ${apiConfiguration.accessToken}`,
        // }),
      },
      timeout: 30 * 1000 // 30 seconds
    });
  }

  constructor() {
    this.client = this.createAxiosClient();
    this.client.interceptors.request.use(
      (config) => {
        console.log(config);
        if (config && config.headers && config?.headers.Authorization != null) {
          return config;
        }

        const token = getStoredAuthToken();
        console.log(token);

        if (token != null && token !== "") {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      // Only works for 200 series.
      (value) => value
    );
  }

  async post<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig): Promise<TResponse> {
    console.log(config);
    try {
      const response = config ? await this.client.post(path, payload, config) : await this.client.post(path, payload);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError, config?.showDefaultError);
    }
    return {} as TResponse;
  }

  async delete<TResponse>(path: string, queryParam?: {}, config?: RequestConfig): Promise<TResponse> {
    try {
      if (queryParam != null) {
        path = `${path}?${qs.stringify(queryParam)}`;
      }
      const response: any = config ? await this.client.delete(path, config) : await this.client.delete(path);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError, config?.showDefaultError);
    }
    return {} as TResponse;
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError, config?.showDefaultError);
    }
    return {} as TResponse;
  }

  async put<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError, config?.showDefaultError);
    }
    return {} as TResponse;
  }

  async get<TResponse>({ path, queryParam, config }: { path: string; queryParam?: {}; config?: RequestConfig }): Promise<TResponse> {
    try {
      if (queryParam != null) {
        path = `${path}?${qs.stringify(queryParam)}`;
      }
      const response = config ? await this.client.get(path, config) : await this.client.get(path);

      // const response = await this.client.get<TResponse>(path,config);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError, config?.showDefaultError);
      // throw error;
    }
    return {} as TResponse;
  }
}

export const apiClient = new ApiClient();

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  InternalServerError1 = 400,

  NotFound = 404
}
function handleError(error: AxiosError<any, any>, showError: boolean = true) {
  if (!showError) {
    throw error;
  }

  console.log(error);
  const status = error.response?.status;
  console.log(status);
  const error_message = typeof error?.response?.data?.data?.error_text === "string" ? error?.response?.data?.data?.error_text : (error?.response?.data?.error_text[0] ?? "Something went wrong!");
  console.log(error_message);
  //   const { message, code, payload } = error?.response?.data ?? {};

  switch (status) {
    case StatusCode.InternalServerError: {
      // Handle InternalServerError
      ToasterService.error(error_message);

      break;
    }
    case StatusCode.InternalServerError1: {
      console.log("first");
      // Handle InternalServerError
      ToasterService.error(error_message);

      break;
    }
    case StatusCode.Forbidden: {
      // Handle Forbidden
      // ToasterService.error(error_message);
      break;
    }
    case StatusCode.Unauthorized: {
      // Handle Unauthorized
      // dispatch(removeUser());
      // dispatch(removeAuthData());
      removeAuthToken();
      window.open("/login", "_self");
      console.log("UNauthorixed");
      //   store.dispatch(removeAuthData());

      // ToasterService.error(error_message);
      break;
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      // ToasterService.error(error_message);
      break;
    }
    case StatusCode.NotFound: {
      // Handle TooManyRequests
      // ToasterService.error(error_message);
      break;
    }
    default: {
      // Handle TooManyRequests
      ToasterService.error(error_message);
      break;
    }
  }

  throw error;
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
