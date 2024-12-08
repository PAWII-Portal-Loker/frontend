import * as yup from "yup";
import FieldConfig from "../fieldConfig";

export interface FormValues {
  wa_number: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const schema = yup.object().shape({
  wa_number: yup
    .string()
    .required("WhatsApp number is required")
    .matches(/^[0-9]+$/, "WA number must be a number")
    .min(10, "WA number must be at least 10 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const fields: FieldConfig<FormValues>[] = [
  {
    name: "wa_number",
    label: "WhatsApp Number",
    type: "number",
    placeholder: "Enter your WhatsApp number",
    rules: schema.fields.wa_number,
  },
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
  {
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    rules: schema.fields.confirm_password,
  },
];
