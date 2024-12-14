import API from "..";
import { APIResponse, FetchCallback } from "@types";
import { JobSeekerDto } from "./types";
import { CreateJobSeekerDto } from "./types/create";
import { UpdateJobSeekerDto } from "./types/update";

export default class JobSeekerService {
  private api: API = new API();

  async getJobSeekers(callback: FetchCallback<JobSeekerDto[]>) {
    const res: APIResponse<JobSeekerDto[]> = await this.api.GET(
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

  async getJobSeeker(id: string, callback: FetchCallback<JobSeekerDto>) {
    const res: APIResponse<JobSeekerDto> = await this.api.GET(
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

  async createJobSeeker(
    payload: CreateJobSeekerDto,
    callback: FetchCallback<JobSeekerDto>,
  ) {
    const res: APIResponse<JobSeekerDto> = await this.api.POST(
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

  async updateJobSeeker(
    payload: UpdateJobSeekerDto,
    callback: FetchCallback<JobSeekerDto>,
  ) {
    const res: APIResponse<JobSeekerDto> = await this.api.PUT(
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
