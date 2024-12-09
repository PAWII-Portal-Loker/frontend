import { formatDate } from "@/common/utils/date";
import API from "..";
import { CompanyDto, CompanyRequestDto } from "./type";
import { APIResponse, FetchCallback } from "@/common/types";

export default class CompanyService {
  private api: API = new API();

  async getAll(callback: FetchCallback<CompanyDto[]>) {
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

  async getOne(id: string, callback: FetchCallback<CompanyDto>) {
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

  async create(
    payload: CompanyRequestDto,
    callback: FetchCallback<CompanyDto>,
  ) {
    const res: APIResponse<CompanyDto> = await this.api.POST("v1/companies", {
      ...payload,
      founding_date: formatDate(payload.founding_date),
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

  async update(
    payload: CompanyRequestDto,
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
