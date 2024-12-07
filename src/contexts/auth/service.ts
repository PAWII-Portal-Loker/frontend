import API from "..";
import { IsLoginRequest, SignInRequest, SignUpRequest } from "./type";
import { APIResponse, FetchCallback } from "@/common/types";

export default class AuthService {
  private api: API = new API();

  async signIn(payload: SignInRequest, callback: FetchCallback<SignInRequest>) {
    const res: APIResponse<SignInRequest> = await this.api.POST(
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

  async signUp(payload: SignUpRequest, callback: FetchCallback<SignUpRequest>) {
    const res: APIResponse<SignUpRequest> = await this.api.POST(
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

  async isLogin(callback: FetchCallback<IsLoginRequest>) {
    const res: APIResponse<IsLoginRequest> = await this.api.GET(
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
