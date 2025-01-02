import { toaster } from "@ui/toaster";
import clsx from "clsx";
import { FileChangeDetails } from "node_modules/@chakra-ui/react/dist/types/components/file-upload/namespace";
import {
  FieldError,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

export const getFocusRingColorClass = (error: FieldError | undefined) =>
  error ? "focus:ring-red-500" : "focus:ring-blue-500";

export const getSubmitButtonClass = (isLoading: boolean, errors: FieldErrors) =>
  clsx(
    "bg-blue-300 text-white font-bold rounded transition-all duration-200",
    isLoading || Object.keys(errors).length > 0
      ? "cursor-not-allowed"
      : "hover:bg-blue-400"
  );

export interface DocumentUrlsInputProps {
  document_urls: File[];
}

const updateDocumentsAndForm = (
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
  filesObject: FileChangeDetails,
  documents: File[],
  setDocuments: (
    documents: File[] | ((prevDocuments: File[]) => File[])
  ) => void,
  setValue: UseFormSetValue<DocumentUrlsInputProps>,
  trigger: UseFormTrigger<DocumentUrlsInputProps>
) => {
  if (filesObject.rejectedFiles.length > 0) {
    toaster.create({
      title: `${filesObject.rejectedFiles.length} file(s) rejected`,
      description: "Please upload a valid file",
      type: "error",
      duration: 3000,
    });
  }

  const uniqueFiles = filesObject.acceptedFiles.filter(
    (newFile) =>
      !documents.some(
        (doc) =>
          doc.lastModified === newFile.lastModified &&
          doc.name === newFile.name &&
          doc.size === newFile.size &&
          doc.type === newFile.type
      )
  );

  const newDocuments = [...documents, ...uniqueFiles];
  updateDocumentsAndForm(newDocuments, setDocuments, setValue, trigger);
};

export const deleteFileFromList = (files: File[], index: number): File[] => {
  return files.filter((_, i) => i !== index);
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
    updateDocumentsAndForm(newDocuments, setDocuments, setValue, trigger);
    return newDocuments;
  });
};
