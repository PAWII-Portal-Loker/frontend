/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@chakra-ui/react";
import { FieldConfig } from "@types";
import { Button } from "@ui/button";
import {
  DocumentUrlsInputProps,
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "@ui/file-upload";
import { toaster } from "@ui/toaster";
import {
  CONTAINER_ACTIVE_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import {
  downloadZip,
  getInputClass,
  handleFileChange,
  validateFile,
} from "@utils/form";
import clsx from "clsx";
import {
  FieldError,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface FileUploadProps {
  register: UseFormRegister<any>;
  field: FieldConfig<any>;
  errors: FieldErrors;
  isFileLoading: boolean;
  isContentLoading: boolean;
  files: File[];
  setFiles: (documents: File[] | ((prevDocuments: File[]) => File[])) => void;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  trigger: UseFormTrigger<any>;
  maxFileSizeMb?: number;
  maxFiles?: number;
  acceptedFileTypes?: string;
  isDownloadable?: boolean;
}

const FileUpload = ({
  register,
  field,
  errors,
  isFileLoading,
  isContentLoading,
  files,
  setFiles,
  setValue,
  getValues,
  trigger,
  maxFileSizeMb = 5,
  maxFiles = 1,
  acceptedFileTypes = ".png, .jpg",
  isDownloadable,
}: FileUploadProps) => {
  return (
    <FileUploadRoot
      {...register(field.name as string)}
      maxW="xl"
      accept={acceptedFileTypes}
      disabled={isFileLoading || isContentLoading}
      onFileAccept={(acceptedFilesObject) =>
        handleFileChange(acceptedFilesObject, files, (newDocuments) => {
          setFiles(newDocuments);
          setValue("document_urls", newDocuments);
          trigger("document_urls");
        })
      }
      onFileReject={(rejectedFilesObject) =>
        rejectedFilesObject.files.length > 0 &&
        toaster.error({
          title: `${rejectedFilesObject.files.length} file rejected`,
          description: "Please upload a valid file",
          duration: 3000,
        })
      }
      validate={(file) => validateFile(file, files)}
      alignItems="stretch"
      maxFiles={maxFiles}
      maxFileSize={maxFileSizeMb * 1024 * 1024}
    >
      <FileUploadDropzone
        label={field.placeholder}
        description={`${acceptedFileTypes} up to ${maxFileSizeMb}MB (max ${maxFiles} files)`}
        className={clsx(
          getInputClass(
            errors?.[field.name as keyof typeof errors] as
              | FieldError
              | undefined
          ),
          getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES)
        )}
      />
      {isFileLoading && (
        <Text fontSize="sm" color="gray.500">
          Compressing...
        </Text>
      )}
      {isDownloadable && getValues("document_urls").length > 0 && (
        <Button
          onClick={() => downloadZip(getValues("document_urls"))}
          disabled={getValues("document_urls").length === 0}
          className={clsx(
            "mt-2 dark:bg-slate-600/80 bg-slate-400/80 dark:hover:bg-slate-500/70 hover:bg-slate-500/70 transition-colors duration-200 font-bold",
            getThemeClassNames(TEXT_CLASSES)
          )}
        >
          Download All Files (ZIP)
        </Button>
      )}
      <FileUploadList
        files={files}
        showSize
        clearable
        setValue={
          setValue as unknown as UseFormSetValue<DocumentUrlsInputProps>
        }
        trigger={trigger as unknown as UseFormTrigger<DocumentUrlsInputProps>}
      />
    </FileUploadRoot>
  );
};

export default FileUpload;
