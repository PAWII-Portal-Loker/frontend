import API from "..";
import { VacancyDto } from "./type";
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
}
