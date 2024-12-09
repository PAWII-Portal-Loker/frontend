import API from "..";
import { VacancyDto } from "./type";
import { APIResponse, FetchCallback, FilterParams } from "@/common/types";

export default class VacancyService {
  private api: API = new API();

  async getDummy(callback: FetchCallback<VacancyDto[]>, params?: FilterParams) {
    Object.keys(params?.params || {}).forEach(() => {});
    const response = await fetch("/dummy.json");
    const data = await response.json();
    callback.onSuccess(data.vacancy);
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getOneDummy(id: string, callback: FetchCallback<VacancyDto>) {
    const response = await fetch("/dummy.json");
    const data = await response.json();
    const vacancy = data.vacancy.find((v: VacancyDto) => v.id === id);
    if (vacancy) {
      callback.onSuccess(vacancy);
    } else {
      callback.onError("Vacancy not found");
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getAll(callback: FetchCallback<VacancyDto[]>, params?: FilterParams) {
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

  async getOne(id: string, callback: FetchCallback<VacancyDto>) {
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
