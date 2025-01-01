import clsx from "clsx";
import {
  FieldError,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

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

export interface DocumentUrlsInputProps {
  document_urls: File[];
}

export const updateForm = (
  newDocuments: File[],
  setDocuments: (documents: File[]) => void,
  setValue: UseFormSetValue<DocumentUrlsInputProps>,
  trigger: UseFormTrigger<DocumentUrlsInputProps>
) => {
  console.log("newDocumentsUpdateForm", newDocuments);
  setDocuments(newDocuments);
  setValue("document_urls", newDocuments);
  trigger("document_urls");
};

export const deleteFileFromList = (files: File[], index: number): File[] => {
  console.log("files", files);
  console.log("index", index);
  const newFiles = [...files];
  console.log("newFiles", newFiles);
  newFiles.splice(index, 1);
  console.log("newFiles", newFiles);
  return newFiles;
};

export const handleDeleteFile = (
  documents: File[],
  index: number,
  setDocuments: (documents: File[]) => void,
  setValue: UseFormSetValue<DocumentUrlsInputProps>,
  trigger: UseFormTrigger<DocumentUrlsInputProps>,
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
  if (documents) {
    const newDocuments = deleteFileFromList(documents, index);
    updateForm(newDocuments, setDocuments, setValue, trigger);
  }
};
