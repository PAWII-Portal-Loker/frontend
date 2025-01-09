/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea } from "@chakra-ui/react";
import { FieldConfig } from "@types";
import {
  CONTAINER_ACTIVE_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import { getInputClass } from "@utils/form";
import clsx from "clsx";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  register: UseFormRegister<any>;
  field: FieldConfig<any>;
  errors: FieldErrors;
  isContentLoading: boolean;
}

const TextArea = ({
  register,
  field,
  errors,
  isContentLoading,
}: TextAreaProps) => {
  return (
    <Textarea
      {...register(field.name as string)}
      disabled={isContentLoading}
      placeholder={field.placeholder}
      className={clsx(
        getInputClass(errors[field.name as string] as FieldError),
        getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES)
      )}
      autoComplete="off"
    />
  );
};

export default TextArea;
