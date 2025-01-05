import {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { generateDeviceId } from "./deviceId";

const authReqInterceptors = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const userId = localStorage.getItem("user_id");

  if (accessToken) {
    config.headers["x-access-token"] = accessToken;
  }
  if (refreshToken) {
    config.headers["x-refresh-token"] = refreshToken;
  }
  if (userId) {
    config.headers["x-user-id"] = userId;
  }

  return config;
};

const authResInterceptors = (response: AxiosResponse) => {
  const accessToken = response.headers["x-access-token"];
  const refreshToken = response.headers["x-refresh-token"];
  const user_id = response.headers["x-user-id"];

  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
  }
  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }
  if (user_id) {
    localStorage.setItem("user_id", user_id);
  }

  return response;
};

const deviceIdInterceptors = (config: InternalAxiosRequestConfig) => {
  const deviceId = generateDeviceId();

  if (deviceId) {
    config.headers["x-device-id"] = deviceId;
  }

  return config;
};

export const applyInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      authReqInterceptors(config);
      deviceIdInterceptors(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use((response) => {
    authResInterceptors(response);
    return response;
  });
};
