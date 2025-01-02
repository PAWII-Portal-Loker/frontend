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

type FileError =
  | "TOO_MANY_FILES"
  | "FILE_INVALID_TYPE"
  | "FILE_TOO_LARGE"
  | "FILE_TOO_SMALL"
  | "FILE_INVALID";
export const validateFile = (
  file: File,
  documents: File[]
): FileError[] | null => {
  const errors: FileError[] = [];

  if (file.size > 5 * 1024 * 1024) {
    toaster.create({
      title: "File too large",
      description: `${file.name} is too large. Please upload a file less than 5MB`,
      type: "error",
      duration: 3000,
    });
    errors.push("FILE_TOO_LARGE");
  }

  if (
    !["image/png", "image/jpg", "image/jpeg", "application/pdf"].includes(
      file.type
    )
  ) {
    toaster.create({
      title: "Invalid file type",
      description: `${file.name} is not a valid file type. Please upload a .png, .jpg, or .pdf file`,
      type: "error",
      duration: 3000,
    });
    errors.push("FILE_INVALID_TYPE");
  }

  if (documents.length >= 5) {
    toaster.create({
      title: "Maximum files reached",
      description: "You can only upload up to 5 files",
      type: "error",
      duration: 3000,
    });
    errors.push("TOO_MANY_FILES");
  }

  if (/\s/.test(file.name)) {
    toaster.create({
      title: "Invalid file name",
      description: `${file.name} contains whitespace. Please rename the file and try again`,
      type: "error",
      duration: 3000,
    });
    errors.push("FILE_INVALID");
  }

  if (
    documents.some(
      (doc) =>
        doc.lastModified === file.lastModified &&
        doc.name === file.name &&
        doc.size === file.size &&
        doc.type === file.type
    )
  ) {
    toaster.create({
      title: "Duplicate file",
      description: `${file.name} is already uploaded. Please upload a different file`,
      type: "error",
      duration: 3000,
    });
    errors.push("FILE_INVALID");
  }

  return errors.length > 0 ? errors : null;
};
