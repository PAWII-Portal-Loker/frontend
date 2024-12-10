import { APIResponse, FilterParams } from "@/common/types";
import { applyInterceptors } from "@/common/utils/interceptors";
import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from "axios";

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

    applyInterceptors(this.api);
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
