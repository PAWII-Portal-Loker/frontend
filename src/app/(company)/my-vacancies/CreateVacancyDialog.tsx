import { Stack } from "@chakra-ui/react";
import { GiClick } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { getSubmitButtonClass } from "@utils/form";
import useVacancyStore from "@vacancy/store";
import {
  CONTAINER_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import { CreateVacancySchema } from "@vacancy/schemas/create";
import { CreateVacancyFormDto } from "@vacancy/types/create";
import { CreateVacancyField } from "@vacancy/fields/create";
import { useIncomeTypestore } from "@enums/stores/incomeType";
import { useJobTypestore } from "@enums/stores/jobType";
import { useEffect } from "react";
import FileUpload from "@commoncomponents/form/FileUpload";
import TextArea from "@commoncomponents/form/TextArea";
import Dropdown from "@commoncomponents/form/Dropdown";
import TextInput from "@commoncomponents/form/TextInput";

const CreateVacancyDialog = () => {
  const {
    isVacancyLoading,
    isVacancyDialogOpen,
    setVacancyDialogOpen,
    createVacancy,
    image,
    setImage,
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
      onOpenChange={() => setVacancyDialogOpen(!isVacancyDialogOpen)}
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
                      <FileUpload
                        formState={{
                          register,
                          setValue,
                          getValues,
                          trigger,
                          field,
                          errors,
                        }}
                        isFileLoading={isImageLoading}
                        isContentLoading={isVacancyLoading}
                        files={image}
                        setFiles={setImage}
                        isDownloadable={false}
                      />
                    );
                  } else if (field.type === "select") {
                    return (
                      <Dropdown
                        formState={{
                          register,
                          field,
                          control,
                        }}
                        isContentLoading={
                          field.name === "income_type"
                            ? isIncomeTypesLoading
                            : isJobTypesLoading
                        }
                        items={
                          field.name === "income_type" ? incomeTypes : jobTypes
                        }
                      />
                    );
                  } else if (field.type === "textarea") {
                    return (
                      <TextArea
                        formState={{
                          register,
                          field,
                          errors,
                        }}
                        isContentLoading={isVacancyLoading}
                      />
                    );
                  } else {
                    return (
                      <TextInput
                        formState={{
                          register,
                          field,
                          errors,
                        }}
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
