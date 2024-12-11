import API from "..";
import { CompanyDto, CreateCompanyDto, UpdateCompanyDto } from "./type";
import { APIResponse, FetchCallback } from "@/common/types";

export default class CompanyService {
  private api: API = new API();

  async getCompanies(callback: FetchCallback<CompanyDto[]>) {
    const res: APIResponse<CompanyDto[]> = await this.api.GET("v1/companies");
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
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
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
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
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
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
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }
}
