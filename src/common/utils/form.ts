import clsx from "clsx";
import { FieldError, FieldErrors } from "react-hook-form";

export const getFocusRingColorClass = (error: FieldError | undefined) => {
  return error ? "focus:ring-red-500" : "focus:ring-blue-500";
};

export const getSubmitButtonClass = (
  isLoading: boolean,
  errors: FieldErrors,
) => {
  return clsx(
    "bg-blue-300 text-white font-bold rounded transition-all duration-200",
    isLoading || Object.keys(errors).length > 0
      ? "cursor-not-allowed"
      : "hover:bg-blue-400",
  );
};

export const handleFileChange =
  (setDocuments: (documents: FileList | null) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setDocuments(e.target.files);
      }
    };

export const deleteFileFromList = (files: FileList | null, index: number): FileList | null => {
  if (!files) return null;
  const filesArray = Array.from(files);
  const newFilesArray = filesArray.filter((_, i) => i !== index);
  const newFiles = new DataTransfer();
  newFilesArray.forEach(file => newFiles.items.add(file));
  return newFiles.files;
};