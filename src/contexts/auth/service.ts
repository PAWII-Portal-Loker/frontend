import API from "..";
import { IsLoginDto, SignInDto } from "./type";
import { APIResponse, FetchCallback } from "@/common/types";

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

  async isLogin(callback: FetchCallback<IsLoginDto>) {
    const res: APIResponse<IsLoginDto> = await this.api.GET("v1/auth/is-login");
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
