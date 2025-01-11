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
import { useApplicationStore } from "@application/store";
import { CreateApplicationFormDto } from "@application/types/create";
import { CreateApplicationField } from "@application/fields/create";
import useVacancyStore from "@vacancy/store";
import { useParams } from "next/navigation";
import { CreateApplicationSchema } from "@application/schemas/create";
import {
  CONTAINER_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import FileUpload from "@commoncomponents/form/FileUpload";
import TextArea from "@commoncomponents/form/TextArea";

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
    isDocumentLoading,
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
                  <FileUpload
                    formState={{
                      register,
                      setValue,
                      getValues,
                      trigger,
                      field,
                      errors,
                    }}
                    isFileLoading={isDocumentLoading}
                    isContentLoading={isApplicationLoading}
                    files={documents}
                    setFiles={setDocuments}
                    maxFiles={5}
                    acceptedFileTypes=".png, .jpg, .pdf"
                    isDownloadable={false}
                  />
                ) : (
                  <TextArea
                    formState={{
                      register,
                      field,
                      errors,
                    }}
                    isContentLoading={isApplicationLoading}
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
