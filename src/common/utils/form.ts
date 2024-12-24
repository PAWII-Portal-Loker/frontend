import clsx from "clsx";
import { FieldError, FieldErrors } from "react-hook-form";

export const getFocusRingColorClass = (error: FieldError | undefined) => {
  return error ? "focus:ring-red-500" : "focus:ring-blue-500";
};

export const getSubmitButtonClass = (
  isLoading: boolean,
  errors: FieldErrors
) => {
  return clsx(
    "bg-blue-300 text-white font-bold rounded transition-all duration-200",
    isLoading || Object.keys(errors).length > 0
      ? "cursor-not-allowed"
      : "hover:bg-blue-400"
  );
};
