import API from "..";
import { APIResponse, FetchCallback } from "@types";
import { GetFileDto } from "./types/get";

export default class FileUploadService {
  private api: API = new API();

  async getFile(key: string, callback: FetchCallback<GetFileDto>) {
    const res = (await this.api.GET(
      `v1/files/${key}`,
    )) as unknown as GetFileDto;

    if (!res?.url) {
      callback.onError("File not found");
    } else {
      callback.onSuccess(res);
    }
    callback.onFullfilled?.();
  }

  async uploadFile(file: File, callback: FetchCallback<string>) {
    const formData = new FormData();
    formData.append("file", file);
    const res: APIResponse<string> = await this.api.POST("v1/files", formData);
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async deleteFile(key: string, callback: FetchCallback<string>) {
    const res: APIResponse<string> = await this.api.DELETE(`v1/files/${key}`);
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }
}
