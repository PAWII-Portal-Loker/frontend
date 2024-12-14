import API from "..";
import { SignInDto } from "./types/signIn";
import { CheckLoginDto } from "./types/checkLogin";
import { APIResponse, FetchCallback } from "@types";

export default class AuthService {
  private api: API = new API();

  async signIn(payload: SignInDto, callback: FetchCallback<SignInDto>) {
    const res: APIResponse<SignInDto> = await this.api.POST(
      "v1/auth/signin",
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

  async checkLogin(callback: FetchCallback<CheckLoginDto>) {
    const res: APIResponse<CheckLoginDto> = await this.api.GET(
      "v1/auth/is-login",
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

  async signOut(callback: FetchCallback<void>) {
    const res: APIResponse<void> = await this.api.POST("v1/auth/signout", {});
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
