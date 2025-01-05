import { FieldConfig } from "@types";
import { SignInSchema } from "../schemas/signIn";
import { SignInDto } from "../types/signIn";

export const SignInField: FieldConfig<SignInDto>[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
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
