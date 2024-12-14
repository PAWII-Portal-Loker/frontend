import API from "..";
import { ConstDto } from "./types/conts";
import { CompanyTypeDto } from "./types/companyTypes";
import { IncomeTypeDto } from "./types/incomeTypes";
import { JobTypeDto } from "./types/jobTypes";
import { RoleDto } from "./types/roles";
import { LastEducationTypeDto } from "./types/lastEducationTypes";
import { APIResponse, FetchCallback } from "@types";

export default class ConstService {
  private api: API = new API();

  async getConsts(callback: FetchCallback<ConstDto>) {
    const res: APIResponse<ConstDto> = await this.api.GET("v1/consts");
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async getCompanyTypes(callback: FetchCallback<CompanyTypeDto[]>) {
    const res: APIResponse<CompanyTypeDto[]> = await this.api.GET(
      "v1/consts/company-types",
    );
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async getIncomeTypes(callback: FetchCallback<IncomeTypeDto[]>) {
    const res: APIResponse<IncomeTypeDto[]> = await this.api.GET(
      "v1/consts/income-types",
    );
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async getJobTypes(callback: FetchCallback<JobTypeDto[]>) {
    const res: APIResponse<JobTypeDto[]> = await this.api.GET(
      "v1/consts/job-types",
    );
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async getRoles(callback: FetchCallback<RoleDto[]>) {
    const res: APIResponse<RoleDto[]> = await this.api.GET("v1/consts/roles");
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async getLastEducationTypes(callback: FetchCallback<LastEducationTypeDto[]>) {
    const res: APIResponse<LastEducationTypeDto[]> = await this.api.GET(
      "v1/consts/last-education-types",
    );
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }
}
