import * as Yup from "yup";
import { CreateUserDto } from "./type";
import FieldConfig from "@/common/types/fieldConfig";

export const CreateUserSchema = Yup.object()
  .shape({
    wa_number: Yup.string()
      .required("WhatsApp number is required")
      .matches(/^[0-9]+$/, "WhatsApp number must be a number")
      .min(10, "WhatsApp number must be at least 10 characters")
      .max(20, "WhatsApp number must be at most 20 characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),

    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .noUnknown(true)
  .strict(true);

export const CreateUserField: FieldConfig<
  CreateUserDto & { confirm_password: string }
>[] = [
  {
    name: "wa_number",
    label: "WhatsApp Number",
    type: "number",
    placeholder: "Enter your WhatsApp number",
    rules: CreateUserSchema.fields.wa_number,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    rules: CreateUserSchema.fields.email,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    rules: CreateUserSchema.fields.password,
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    rules: CreateUserSchema.fields.confirm_password,
  },
];