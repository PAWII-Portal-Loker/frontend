import API from "..";
import { VacancyEntity } from "./type";
import { APIResponse, FetchCallback, FilterParams } from "@/common/types";

export default class VacancyService {
  private api: API = new API();

  async getDummy(
    callback: FetchCallback<VacancyEntity[]>,
    params?: FilterParams,
  ) {
    Object.keys(params?.params || {}).forEach(() => {});
    const response = await fetch("/dummy.json");
    const data = await response.json();
    callback.onSuccess(data.vacancy);
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getOneDummy(id: string, callback: FetchCallback<VacancyEntity>) {
    const response = await fetch("/dummy.json");
    const data = await response.json();
    const vacancy = data.vacancy.find((v: VacancyEntity) => v.id === id);
    if (vacancy) {
      callback.onSuccess(vacancy);
    } else {
      callback.onError("Vacancy not found");
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getAll(
    callback: FetchCallback<VacancyEntity[]>,
    params?: FilterParams,
  ) {
    const res: APIResponse<VacancyEntity[]> = await this.api.GET(
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

  async getOne(id: string, callback: FetchCallback<VacancyEntity>) {
    const res: APIResponse<VacancyEntity> = await this.api.GET(
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
