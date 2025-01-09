/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@chakra-ui/react";
import { FieldConfig } from "@types";
import {
  CONTAINER_ACTIVE_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import { getInputClass } from "@utils/form";
import clsx from "clsx";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<any>;
  field: FieldConfig<any>;
  errors: FieldErrors;
}

const TextInput = ({ register, field, errors }: InputProps) => {
  return (
    <Input
      {...register(field.name as string, {
        valueAsNumber: field.type === "number",
      })}
      type={field.type as string}
      placeholder={field.placeholder}
      className={clsx(
        "p-4 rounded-lg border-2 bg-gray-100 text-lg placeholder-gray-400 appearance-none",
        errors[field.name as string]
          ? "focus-visible:ring-red-500 border-red-500"
          : "border-gray-300",
        getInputClass(errors[field.name as string] as FieldError | undefined),
        getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES)
      )}
    />
  );
};

export default TextInput;
