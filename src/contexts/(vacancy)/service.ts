import API from "..";
import {
  CreateVacancyDto,
  UpdateVacancyDto,
  updateVacancyStatusDto,
  VacancyDto,
} from "./type";
import { APIResponse, FetchCallback, FilterParams } from "@/common/types";

export default class VacancyService {
  private api: API = new API();

  async getVacancies(
    callback: FetchCallback<VacancyDto[]>,
    params?: FilterParams,
  ) {
    const res: APIResponse<VacancyDto[]> = await this.api.GET(
      "v1/vacancies",
      params,
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

  async getVacancy(id: string, callback: FetchCallback<VacancyDto>) {
    const res: APIResponse<VacancyDto> = await this.api.GET(
      `v1/vacancies/${id}`,
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

  async createVacancy(
    payload: CreateVacancyDto,
    callback: FetchCallback<VacancyDto>,
  ) {
    const res: APIResponse<VacancyDto> = await this.api.POST(
      "v1/vacancies",
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

  async updateVacancy(
    id: string,
    payload: UpdateVacancyDto,
    callback: FetchCallback<VacancyDto>,
  ) {
    const res: APIResponse<VacancyDto> = await this.api.PUT(
      `v1/vacancies/${id}`,
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

  async updateVacancyStatus(
    id: string,
    payload: updateVacancyStatusDto,
    callback: FetchCallback<VacancyDto>,
  ) {
    const res: APIResponse<VacancyDto> = await this.api.PATCH(
      `v1/vacancies/${id}/status`,
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
