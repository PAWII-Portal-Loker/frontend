import * as Yup from "yup";
import { SignInDto } from "./type";
import FieldConfig from "@/common/types/fieldConfig";

export const SignInSchema = Yup.object({
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

export const SignInField: FieldConfig<SignInDto>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    rules: SignInSchema.fields.email,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    rules: SignInSchema.fields.password,
  },
];
