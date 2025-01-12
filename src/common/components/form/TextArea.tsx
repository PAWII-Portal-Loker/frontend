import { Textarea } from "@chakra-ui/react";
import { FieldConfig } from "@types";
import {
  CONTAINER_ACTIVE_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import { getInputClass } from "@utils/form";
import clsx from "clsx";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface TextAreaProps<T extends FieldValues> {
  formState: {
    register: UseFormRegister<T>;
    field: FieldConfig<T>;
    errors: FieldErrors;
  };
  isContentLoading: boolean;
}

const TextArea = <T extends FieldValues>({
  formState: { register, field, errors },
  isContentLoading,
}: TextAreaProps<T>) => {
  return (
    <Textarea
      {...register(field.name as Path<T>)}
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
