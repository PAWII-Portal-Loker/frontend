import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useApplicationStore } from "@application/store";
import { toaster } from "@ui/toaster";
import clsx from "clsx";
import { FileAcceptDetails } from "node_modules/@chakra-ui/react/dist/types/components/file-upload/namespace";
import {
  FieldError,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { compressPdf, compressImage } from "./compress";
import useVacancyStore from "@vacancy/store";

const { setDocuments } = useApplicationStore.getState();

export const getInputClass = (error: FieldError | undefined) =>
  clsx(
    "p-4 rounded-lg border-2 bg-gray-100 text-lg placeholder-gray-400 appearance-none",
    error ? "focus-visible:ring-red-500 border-red-500" : "border-gray-300"
  );

export const getSubmitButtonClass = (isLoading: boolean, errors: FieldErrors) =>
  clsx(
    "bg-blue-500 text-white font-bold rounded transition-all duration-200",
    Object.keys(errors).length > 0 && "cursor-not-allowed",
    isLoading && "cursor-wait",
    Object.keys(errors).length === 0 && !isLoading && "hover:bg-blue-600"
  );

export interface DocumentUrlsInputProps {
  document_urls: File[];
}

export const updateDocumentsAndForm = (
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

const processFile = (
  file: File,
  newDocuments: File[],
  setValue: UseFormSetValue<DocumentUrlsInputProps>,
  trigger: UseFormTrigger<DocumentUrlsInputProps>
) => {
  if (file.type.startsWith("image/")) {
    compressImage(file, (compressedFile) => {
      newDocuments.push(compressedFile);
      updateDocumentsAndForm(newDocuments, setDocuments, setValue, trigger);
    });
  } else if (file.type === "application/pdf") {
    compressPdf(file, (compressedFile) => {
      newDocuments.push(compressedFile);
      updateDocumentsAndForm(newDocuments, setDocuments, setValue, trigger);
    });
  } else {
    newDocuments.push(file);
    updateDocumentsAndForm(newDocuments, setDocuments, setValue, trigger);
  }
};

const replaceWhitespaceWithHyphen = (fileName: string): string => {
  return fileName.replace(/\s+/g, "-");
};

export const handleFileChange = (
  acceptedFilesObject: FileAcceptDetails,
  documents: File[],
  setValue: UseFormSetValue<DocumentUrlsInputProps>,
  trigger: UseFormTrigger<DocumentUrlsInputProps>
) => {
  const { setDocumentLoading } = useApplicationStore.getState();
  setDocumentLoading(true);

  const newDocuments = [...documents];

  const uniqueAcceptedFiles = acceptedFilesObject.files.filter(
    (file, index, self) => {
      return (
        index ===
        self.findIndex(
          (f) =>
            replaceWhitespaceWithHyphen(f.name) ===
            replaceWhitespaceWithHyphen(file.name)
        )
      );
    }
  );

  uniqueAcceptedFiles.forEach((file) => {
    const newFileName = replaceWhitespaceWithHyphen(file.name);
    const newFile = new File([file], newFileName, { type: file.type });

    if (
      documents.some((doc) => doc.name === newFileName) ||
      newDocuments.some((doc) => doc.name === newFileName)
    ) {
      return;
    }

    processFile(newFile, newDocuments, setValue, trigger);
  });
  setDocumentLoading(false);
};

export const deleteFileFromList = (files: File[], index: number): File[] => {
  return files.filter((_, i) => i !== index);
};

export const handleDeleteFile = (
  index: number,
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
  const fileName = replaceWhitespaceWithHyphen(file.name);

  if (file.size > 5 * 1024 * 1024) {
    toaster.error({
      title: "File too large",
      description: `${fileName} is too large. Please upload a file less than 5MB`,
      duration: 3000,
    });
    errors.push("FILE_TOO_LARGE");
  }

  if (
    !["image/png", "image/jpg", "image/jpeg", "application/pdf"].includes(
      file.type
    )
  ) {
    toaster.error({
      title: "Invalid file type",
      description: `${fileName} is not a valid file type. Please upload a .png, .jpg, or .pdf file`,
      duration: 3000,
    });
    errors.push("FILE_INVALID_TYPE");
  }

  if (documents.length >= 5) {
    toaster.error({
      title: "Maximum files reached",
      description: "You can only upload up to 5 files",
      duration: 3000,
    });
    errors.push("TOO_MANY_FILES");
  }

  if (
    documents.some((doc) => replaceWhitespaceWithHyphen(doc.name) === fileName)
  ) {
    toaster.error({
      title: "Duplicate file",
      description: `${fileName} is already uploaded. Please upload a different file`,
      duration: 3000,
    });
    errors.push("FILE_INVALID");
  }

  return errors.length > 0 ? errors : null;
};

export const downloadZip = (files: File[]) => {
  const { vacancy } = useVacancyStore.getState();

  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file);
  });
  zip
    .generateAsync({ type: "blob" })
    .then((content) => {
      saveAs(
        content,
        `${vacancy?.position}-${vacancy?.company.company_name}-documents.zip`
      );
    })
    .catch((error) => {
      toaster.error({
        title: "Failed to download documents",
        description: error.message,
        duration: 3000,
      });
    });
};
