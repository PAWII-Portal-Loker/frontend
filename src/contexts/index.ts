import { APIResponse, FilterParams } from "@/common/types";
import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from "axios";
import { DeviceUUID } from "device-uuid";

type Headers = {
  Accept: string;
  "Content-type": string;
};

export default class API {
  headers: Headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "/api",
      headers: this.headers,
    } as AxiosRequestConfig);

    this.api.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        const userId = localStorage.getItem("user_id");
        const deviceId = new DeviceUUID().get();

        if (accessToken) {
          config.headers["X-Access-Token"] = accessToken;
        }
        if (refreshToken) {
          config.headers["X-Refresh-Token"] = refreshToken;
        }
        if (userId) {
          config.headers["X-User-Id"] = userId;
        }
        if (deviceId) {
          config.headers["X-Device-Id"] = deviceId;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.api.interceptors.response.use((response) => {
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
    });
  }

  setHeader(key: string, value: string) {
    this.api.defaults.headers.common[key] = value;
  }

  async GET<T>(path: string, params?: FilterParams): Promise<APIResponse<T>> {
    try {
      const res = await this.api.get(path, params);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        return {
          success: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<T>;
      } else {
        return {
          success: false,
          message: "Internal Server Error",
        } as APIResponse<T>;
      }
    }
  }

  async POST<T>(path: string, data: unknown): Promise<APIResponse<T>> {
    try {
      const res = await this.api.post(path, data);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        return {
          success: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<T>;
      } else {
        return {
          success: false,
          message: "Internal Server Error",
        } as APIResponse<T>;
      }
    }
  }

  async PUT<T>(path: string, data: unknown): Promise<APIResponse<T>> {
    try {
      const res = await this.api.put(path, data);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        return {
          success: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<T>;
      } else {
        return {
          success: false,
          message: "Internal Server Error",
        } as APIResponse<T>;
      }
    }
  }

  async PATCH<T>(path: string, data: unknown): Promise<APIResponse<T>> {
    try {
      const res = await this.api.patch(path, data);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        return {
          success: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<T>;
      } else {
        return {
          success: false,
          message: "Internal Server Error",
        } as APIResponse<T>;
      }
    }
  }

  async DELETE<T>(path: string): Promise<APIResponse<T>> {
    try {
      const res = await this.api.delete(path);
      if (res.data === "") {
        return {
          success: true,
          message: "Success",
          data: null,
        } as unknown as APIResponse<T>;
      }
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        return {
          success: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<T>;
      } else {
        return {
          success: false,
          message: "Internal Server Error",
        } as APIResponse<T>;
      }
    }
  }
}
