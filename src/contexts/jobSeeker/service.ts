import API from "..";
import { JobSeekerEntity, JobSeekerRequestEntity } from "./type";
import { APIResponse, FetchCallback } from "@/common/types";

export default class JobSeekerService {
  private api: API = new API();

  async getAll(callback: FetchCallback<JobSeekerEntity[]>) {
    const res: APIResponse<JobSeekerEntity[]> = await this.api.GET(
      "v1/job-seekers",
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

  async getOne(id: string, callback: FetchCallback<JobSeekerEntity>) {
    const res: APIResponse<JobSeekerEntity> = await this.api.GET(
      `v1/job-seekers/${id}`,
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
    payload: JobSeekerRequestEntity,
    callback: FetchCallback<JobSeekerEntity>,
  ) {
    const res: APIResponse<JobSeekerEntity> = await this.api.POST(
      "v1/job-seekers",
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

  async update(
    payload: JobSeekerEntity,
    callback: FetchCallback<JobSeekerEntity>,
  ) {
    const res: APIResponse<JobSeekerEntity> = await this.api.PUT(
      "v1/job-seekers",
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
