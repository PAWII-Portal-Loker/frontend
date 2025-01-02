import { SignInDto } from "@auth/types/signIn";
import * as Yup from "yup";

export const SignInSchema: Yup.ObjectSchema<SignInDto> = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
})
  .noUnknown(true)
  .strict(true);
