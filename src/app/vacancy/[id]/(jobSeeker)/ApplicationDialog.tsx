import { Stack, Input } from "@chakra-ui/react";
import { GiClick } from "react-icons/gi";
import { FieldError, useForm } from "react-hook-form";
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
  deleteFileFromList,
  getFocusRingColorClass,
  getSubmitButtonClass,
  handleFileChange,
} from "@utils/form";
import { useApplicationStore } from "@application/store";
import { CreateApplicationFormDto } from "@application/types/create";
import { CreateApplicationField } from "@application/fields/create";
import useVacancyStore from "@vacancy/store";
import { useParams } from "next/navigation";
import { CreateApplicationSchema } from "@application/schemas/create";

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
  } = useForm<CreateApplicationFormDto>({
    resolver: yupResolver(CreateApplicationSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    createApplication({
      vacancy_id: vacancyId,
      document_urls: await uploadDocuments(documents!),
      message: data.message,
    });
  });

  return (
    <DialogRoot
      lazyMount
      open={isApplicationDialogOpen}
      onOpenChange={() => setApplicationDialogOpen(false)}
    >
      <DialogContent className="bg-slate-500 text-gray-100">
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
                <Input
                  {...register(field.name, {
                    onChange:
                      field.type === "file"
                        ? handleFileChange(setDocuments)
                        : undefined,
                  })}
                  disabled={
                    field.type === "file" &&
                    (isDocumentUploading || isDocumentDeleting)
                  }
                  type={field.type}
                  multiple={field.type === "file"}
                  placeholder={field.placeholder}
                  className={clsx(
                    "rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-100 text-lg text-gray-800 placeholder-gray-400 appearance-none",
                    field.type == "file"
                      ? "file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:cursor-pointer file:hover:bg-blue-600 leading-none"
                      : "p-4",
                    getFocusRingColorClass(errors[field.name] as FieldError),
                  )}
                />
              </Field>
            ))}
            <ul className="mt-2">
              {Array.from(documents || []).map((document, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-gray-200">{document.name}</span>
                  <button
                    onClick={() => {
                      setDocuments(deleteFileFromList(documents, index));
                    }}
                    className="text-red-500 hover:text-red-600"
                    disabled={isDocumentUploading || isDocumentDeleting}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
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
