import API from "..";
import { APIResponse, FetchCallback } from "@/common/types";
import { ConstEntity } from "./type";

export default class ConstService {
  private api: API = new API();

  async getConsts(callback: FetchCallback<ConstEntity>) {
    const res: APIResponse<ConstEntity> = await this.api.GET("v1/consts");
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getCompanyTypes(callback: FetchCallback<string[]>) {
    const res: APIResponse<string[]> = await this.api.GET(
      "v1/consts/company-types",
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

  async getIncomeTypes(callback: FetchCallback<string[]>) {
    const res: APIResponse<string[]> = await this.api.GET(
      "v1/consts/income-types",
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

  async getJobTypes(callback: FetchCallback<string[]>) {
    const res: APIResponse<string[]> = await this.api.GET(
      "v1/consts/job-types",
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

  async getRoles(callback: FetchCallback<string[]>) {
    const res: APIResponse<string[]> = await this.api.GET("v1/consts/roles");
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
