import API from "..";
import { ApplicationDto } from "./type";
import { APIResponse, FetchCallback } from "@/common/types";

export default class ApplicationService {
  private api: API = new API();

  async getDummy(callback: FetchCallback<ApplicationDto[]>) {
    const response = await fetch("/dummy.json");
    const data = await response.json();
    callback.onSuccess(data.application);
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getOneDummy(id: string, callback: FetchCallback<ApplicationDto>) {
    const response = await fetch("/dummy.json");
    const data = await response.json();
    const application = data.application.find(
      (v: ApplicationDto) => v.id === id,
    );
    if (application) {
      callback.onSuccess(application);
    } else {
      callback.onError("Application not found");
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getAll(callback: FetchCallback<ApplicationDto[]>) {
    const res: APIResponse<ApplicationDto[]> = await this.api.GET(
      "v1/application",
    );
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getOne(id: string, callback: FetchCallback<ApplicationDto>) {
    const res: APIResponse<ApplicationDto> = await this.api.GET(
      `v1/application/${id}`,
    );
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }
}
