import { Stack, Textarea } from "@chakra-ui/react";
import { GiClick } from "react-icons/gi";
import {
  FieldError,
  useForm,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@ui/dialog";
import { Field } from "@ui/field";
import { Button } from "@ui/button";
import {
  DocumentUrlsInputProps,
  getInputClass,
  getSubmitButtonClass,
  handleFileChange,
  validateFile,
} from "@utils/form";
import { useApplicationStore } from "@application/store";
import { CreateApplicationFormDto } from "@application/types/create";
import { CreateApplicationField } from "@application/fields/create";
import useVacancyStore from "@vacancy/store";
import { useParams } from "next/navigation";
import { CreateApplicationSchema } from "@application/schemas/create";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "@ui/file-upload";
import {
  CONTAINER_ACTIVE_CLASSES,
  CONTAINER_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";

const ApplicationDialog = () => {
  const vacancyId = useParams().id as string;
  const { vacancy } = useVacancyStore();
  const {
    isApplicationLoading,
    isApplicationDialogOpen,
    setApplicationDialogOpen,
    createApplication,
    documents,
    setDocuments,
    uploadDocuments,
    isDocumentUploading,
    isDocumentDeleting,
  } = useApplicationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm<CreateApplicationFormDto>({
    resolver: yupResolver(CreateApplicationSchema),
    defaultValues: {
      document_urls: [],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    createApplication({
      vacancy_id: vacancyId,
      document_urls: await uploadDocuments(getValues("document_urls")),
      message: data.message,
    });
  });

  return (
    <DialogRoot
      lazyMount
      open={isApplicationDialogOpen}
      onOpenChange={() => setApplicationDialogOpen(false)}
    >
      <DialogContent
        className={getThemeClassNames(CONTAINER_CLASSES, TEXT_CLASSES)}
      >
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="2xl" fontWeight="bold">
            Apply to {vacancy.position} ({vacancy.company.company_name})
          </DialogTitle>
        </DialogHeader>
        <DialogBody as="form" onSubmit={onSubmit}>
          <Stack wordSpacing={4}>
            {CreateApplicationField.map((field) => (
              <Field
                key={field.name}
                label={field.label}
                invalid={!!errors[field.name]}
                errorText={errors[field.name]?.message}
              >
                {field.type === "file" ? (
                  <FileUploadRoot
                    {...register(field.name)}
                    maxW="xl"
                    disabled={
                      isDocumentUploading ||
                      isDocumentDeleting ||
                      isApplicationLoading
                    }
                    onFileChange={(filesObject) =>
                      handleFileChange(
                        filesObject,
                        documents,
                        setDocuments,
                        setValue as unknown as UseFormSetValue<DocumentUrlsInputProps>,
                        trigger as unknown as UseFormTrigger<DocumentUrlsInputProps>
                      )
                    }
                    validate={(file) => validateFile(file, documents)}
                    alignItems="stretch"
                    maxFiles={5}
                    maxFileSize={5 * 1024 * 1024}
                  >
                    <FileUploadDropzone
                      label={field.placeholder}
                      description=".png, .jpg, ,pdf up to 5MB (max 5 files)"
                      className={clsx(
                        getInputClass(errors[field.name] as FieldError),
                        getThemeClassNames(
                          CONTAINER_ACTIVE_CLASSES,
                          TEXT_CLASSES
                        )
                      )}
                    />
                    <FileUploadList
                      files={getValues("document_urls")}
                      showSize
                      clearable
                      setValue={setValue}
                      trigger={trigger}
                    />
                  </FileUploadRoot>
                ) : (
                  <Textarea
                    {...register(field.name)}
                    disabled={isApplicationLoading}
                    placeholder={field.placeholder}
                    className={clsx(
                      getInputClass(errors[field.name] as FieldError),
                      getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES)
                    )}
                    autoComplete="off"
                  />
                )}
              </Field>
            ))}

            <Button
              className={getSubmitButtonClass(isApplicationLoading, errors)}
              disabled={isApplicationLoading || Object.keys(errors).length > 0}
              type="submit"
              width="full"
              loading={isApplicationLoading}
              loadingText="Applying..."
              size="lg"
              mt={2}
            >
              <GiClick />
              Apply
            </Button>
          </Stack>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ApplicationDialog;
