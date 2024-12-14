import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { UserDto } from "./types";
import { CreateUserDto } from "./types/create";

export default class UserService {
  private api: API = new API();

  async getUsers(callback: FetchCallback<UserDto[]>) {
    const res: APIResponse<UserDto[]> = await this.api.GET("v1/users");
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async getUser(id: string, callback: FetchCallback<UserDto>) {
    const res: APIResponse<UserDto> = await this.api.GET(`v1/users/${id}`);
    if (!res?.success) {
      callback.onError(res.message);
    } else {
      callback.onSuccess(res.data);
    }
    if (callback.onFullfilled) {
      callback.onFullfilled();
    }
  }

  async createUser(
    payload: CreateUserDto,
    callback: FetchCallback<CreateUserDto>,
  ) {
    const res: APIResponse<CreateUserDto> = await this.api.POST(
      "v1/users",
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
