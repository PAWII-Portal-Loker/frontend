import { Input, Stack, Text, Textarea } from "@chakra-ui/react";
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
import useVacancyStore from "@vacancy/store";
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
import { toaster } from "@ui/toaster";
import { CreateVacancySchema } from "@vacancy/schemas/create";
import { CreateVacancyFormDto } from "@vacancy/types/create";
import { CreateVacancyField } from "@vacancy/fields/create";
import { NativeSelectField, NativeSelectRoot } from "@ui/native-select";
import { useIncomeTypestore } from "@enums/stores/incomeType";
import { useJobTypestore } from "@enums/stores/jobType";
import { useEffect } from "react";

const CreateVacancyDialog = () => {
  const {
    isVacancyLoading,
    isVacancyDialogOpen,
    setVacancyDialogOpen,
    createVacancy,
    image,
    uploadImage,
    isImageLoading,
  } = useVacancyStore();

  const { incomeTypes, isIncomeTypesLoading, getIncomeTypes } =
    useIncomeTypestore();
  const { jobTypes, isJobTypesLoading, getJobTypes } = useJobTypestore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm<CreateVacancyFormDto>({
    resolver: yupResolver(CreateVacancySchema),
    defaultValues: {
      document_urls: [],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    createVacancy({
      description: data.description,
      thumbnail_url: await uploadImage(getValues("document_urls")),
      income_type: data.income_type,
      job_type: data.job_type,
      position: data.position,
    });
  });

  useEffect(() => {
    getIncomeTypes();
    getJobTypes();
  }, []);

  return (
    <DialogRoot
      lazyMount
      open={isVacancyDialogOpen}
      onOpenChange={() => setVacancyDialogOpen(false)}
    >
      <DialogContent
        className={getThemeClassNames(CONTAINER_CLASSES, TEXT_CLASSES)}
      >
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="2xl" fontWeight="bold">
            Create Vacancy
          </DialogTitle>
        </DialogHeader>
        <DialogBody as="form" onSubmit={onSubmit}>
          <Stack wordSpacing={4}>
            {CreateVacancyField.map((field) => (
              <Field
                key={field.name}
                label={field.label}
                invalid={!!errors[field.name]}
                errorText={errors[field.name]?.message}
              >
                {(() => {
                  if (field.type === "file") {
                    return (
                      <FileUploadRoot
                        {...register(field.name)}
                        maxW="xl"
                        accept=".png, .jpg"
                        disabled={isImageLoading || isVacancyLoading}
                        onFileAccept={(acceptedFilesObject) =>
                          handleFileChange(
                            acceptedFilesObject,
                            image,
                            setValue as unknown as UseFormSetValue<DocumentUrlsInputProps>,
                            trigger as unknown as UseFormTrigger<DocumentUrlsInputProps>
                          )
                        }
                        onFileReject={(rejectedFilesObject) =>
                          rejectedFilesObject.files.length > 0 &&
                          toaster.error({
                            title: `${rejectedFilesObject.files.length} image rejected`,
                            description: "Please upload a valid image",
                            duration: 3000,
                          })
                        }
                        validate={(file) => validateFile(file, image)}
                        alignItems="stretch"
                        maxFileSize={5 * 1024 * 1024}
                      >
                        <FileUploadDropzone
                          label={field.placeholder}
                          description=".png and .jpg up to 5MB (max 1 files)"
                          className={clsx(
                            getInputClass(
                              errors[field.name] as FieldError | undefined
                            ),
                            getThemeClassNames(
                              CONTAINER_ACTIVE_CLASSES,
                              TEXT_CLASSES
                            )
                          )}
                        />
                        {isImageLoading && (
                          <Text fontSize="sm" color="gray.500">
                            Compressing...
                          </Text>
                        )}
                        <FileUploadList
                          files={getValues("document_urls")}
                          showSize
                          clearable
                          setValue={setValue}
                          trigger={trigger}
                        />
                      </FileUploadRoot>
                    );
                  } else if (field.type === "select") {
                    return (
                      <NativeSelectRoot size="md">
                        <NativeSelectField
                          isLoading={
                            field.name === "income_type"
                              ? isIncomeTypesLoading
                              : isJobTypesLoading
                          }
                          className={clsx(
                            "w-full pl-3 pr-8 py-1 rounded-lg border-2 bg-gray-100 border-gray-300 text-lg text-gray-600 appearance-none",
                            getThemeClassNames(
                              CONTAINER_ACTIVE_CLASSES,
                              TEXT_CLASSES
                            )
                          )}
                          {...register(field.name)}
                          {...control?.register(field.name)}
                          placeholder={field.placeholder}
                          items={
                            field.name === "income_type"
                              ? incomeTypes
                              : jobTypes
                          }
                          _loading={{ opacity: 0.5 }}
                        />
                      </NativeSelectRoot>
                    );
                  } else if (field.type === "textarea") {
                    return (
                      <Textarea
                        {...register(field.name)}
                        disabled={isVacancyLoading}
                        placeholder={field.placeholder}
                        className={clsx(
                          getInputClass(errors[field.name] as FieldError),
                          getThemeClassNames(
                            CONTAINER_ACTIVE_CLASSES,
                            TEXT_CLASSES
                          )
                        )}
                        autoComplete="off"
                      />
                    );
                  } else {
                    return (
                      <Input
                        {...register(field.name)}
                        type={field.type}
                        placeholder={field.placeholder}
                        className={clsx(
                          "p-4 rounded-lg border-2 bg-gray-100 text-lg placeholder-gray-400 appearance-none",
                          errors[field.name]
                            ? "focus-visible:ring-red-500 border-red-500"
                            : "border-gray-300",
                          getInputClass(
                            errors[field.name] as FieldError | undefined
                          ),
                          getThemeClassNames(
                            CONTAINER_ACTIVE_CLASSES,
                            TEXT_CLASSES
                          )
                        )}
                      />
                    );
                  }
                })()}
              </Field>
            ))}

            <Button
              className={getSubmitButtonClass(isVacancyLoading, errors)}
              disabled={isVacancyLoading || Object.keys(errors).length > 0}
              type="submit"
              width="full"
              loading={isVacancyLoading}
              loadingText="Applying..."
              size="lg"
              mt={2}
            >
              <GiClick />
              Create
            </Button>
          </Stack>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateVacancyDialog;
