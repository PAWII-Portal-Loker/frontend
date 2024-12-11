import API from "..";
import { APIResponse, FetchCallback } from "@/common/types";
import { ApplicationDto } from "./types";
import { CreateApplicationDto } from "./types/create";

export default class ApplicationService {
  private api: API = new API();

  async getJobSeekerApplications(callback: FetchCallback<ApplicationDto[]>) {
    const res: APIResponse<ApplicationDto[]> = await this.api.GET(
      "v1/applications",
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

  async getVacancyApplicants(
    id: string,
    callback: FetchCallback<ApplicationDto[]>,
  ) {
    const res: APIResponse<ApplicationDto[]> = await this.api.GET(
      `v1/applications/vacancy/${id}`,
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

  async getApplication(id: string, callback: FetchCallback<ApplicationDto>) {
    const res: APIResponse<ApplicationDto> = await this.api.GET(
      `v1/vacancies/${id}/applicants`,
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

  async createApplication(
    payload: CreateApplicationDto,
    callback: FetchCallback<ApplicationDto>,
  ) {
    const res: APIResponse<ApplicationDto> = await this.api.POST(
      "v1/applications",
      {
        ...payload,
      },
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
