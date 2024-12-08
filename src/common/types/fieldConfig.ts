import { FieldValues } from "react-hook-form";
import { AnyObject, ISchema, Reference } from "yup";

interface FieldConfig<T extends FieldValues> {
  name: keyof T;
  label: string;
  type: string;
  placeholder: string | undefined;
  rules: Reference<unknown> | ISchema<string | number | Date, AnyObject>;
}

export default FieldConfig;
