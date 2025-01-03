import API from "..";
import { APIResponse, FetchCallback } from "@types";
import { CompanyDto } from "./types";
import { CreateCompanyDto } from "./types/create";
import { UpdateCompanyDto } from "./types/update";

export default class CompanyService {
  private api: API = new API();

  async getCompanies(callback: FetchCallback<CompanyDto[]>) {
    const res: APIResponse<CompanyDto[]> = await this.api.GET("v1/companies");
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async getCompany(id: string, callback: FetchCallback<CompanyDto>) {
    const res: APIResponse<CompanyDto> = await this.api.GET(
      `v1/companies/${id}`,
    );
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async createCompany(
    payload: CreateCompanyDto,
    callback: FetchCallback<CompanyDto>,
  ) {
    const res: APIResponse<CompanyDto> = await this.api.POST("v1/companies", {
      ...payload,
    });
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }

  async updateCompany(
    payload: UpdateCompanyDto,
    callback: FetchCallback<CompanyDto>,
  ) {
    const res: APIResponse<CompanyDto> = await this.api.PUT(
      "v1/companies",
      payload,
    );
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    callback.onFullfilled?.();
  }
}
