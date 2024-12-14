import { CreateUserDto } from "@user/types/create";
import { FieldConfig } from "@types";
import { CreateUserSchema } from "@user/schemas/create";

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
