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
  setDocuments: (
    documents: File[] | ((prevDocuments: File[]) => File[])
  ) => void,
  setValue: UseFormSetValue<DocumentUrlsInputProps>,
  trigger: UseFormTrigger<DocumentUrlsInputProps>
) => {
  setDocuments(newDocuments);
  setValue("document_urls", newDocuments);
  trigger("document_urls");
};
export const handleFileChange = (
  filesObject: { acceptedFiles: File[] },
  documents: File[],
  setDocuments: (
    documents: File[] | ((prevDocuments: File[]) => File[])
  ) => void,
  setValue: UseFormSetValue<DocumentUrlsInputProps>,
  trigger: UseFormTrigger<DocumentUrlsInputProps>
) => {
  const newDocuments = [...documents, ...filesObject.acceptedFiles];
  updateForm(newDocuments, setDocuments, setValue, trigger);
};

export const deleteFileFromList = (files: File[], index: number): File[] => {
  const newFiles = [...files];
  newFiles.splice(index, 1);
  return newFiles;
};

export const handleDeleteFile = (
  index: number,
  setDocuments: (
    documents: File[] | ((prevDocuments: File[]) => File[])
  ) => void,
  setValue: UseFormSetValue<DocumentUrlsInputProps>,
  trigger: UseFormTrigger<DocumentUrlsInputProps>,
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
  setDocuments((prevDocuments) => {
    const newDocuments = deleteFileFromList(prevDocuments, index);
    setValue("document_urls", newDocuments);
    trigger("document_urls");
    return newDocuments;
  });
};
