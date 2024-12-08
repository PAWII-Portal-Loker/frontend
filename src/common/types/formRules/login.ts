import * as yup from "yup";
import FieldConfig from "../fieldConfig";

export type FormValues = {
  email: string;
  password: string;
};

export const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const fields: FieldConfig<FormValues>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    rules: schema.fields.email,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    rules: schema.fields.password,
  },
];
