import { RegisterOptions } from "react-hook-form";
import { FieldValues } from "react-hook-form";

interface FieldConfig<T extends FieldValues> {
  name: keyof T;
  label: string;
  type: string;
  placeholder: string;
  rules: RegisterOptions<T>;
}

export default FieldConfig;
