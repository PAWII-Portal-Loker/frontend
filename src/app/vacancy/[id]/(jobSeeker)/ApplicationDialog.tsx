import { Stack, Input } from "@chakra-ui/react";
import { LuLogIn } from "react-icons/lu";
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
  getFocusRingColorClass,
  getSubmitButtonClass,
  handleFileUpload,
} from "@utils/form";
import { useApplicationStore } from "@application/store";
import { CreateApplicationDto } from "@application/types/create";
import { CreateApplicationSchema } from "@application/schemas/create";
import { CreateApplicationField } from "@application/fields/create";
import useVacancyStore from "@vacancy/store";

const ApplicationDialog = () => {
  const { vacancy } = useVacancyStore();
  const {
    application: { document_urls },
    isApplicationLoading,
    isApplicationDialogOpen,
    setApplicationDialogOpen,
    createApplication,
    isDocumentUploading,
    isDocumentDeleting,
    uploadDocuments,
    deleteDocument,
  } = useApplicationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApplicationDto>({
    resolver: yupResolver(CreateApplicationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    createApplication({
      vacancy_id: vacancy.id,
      document_urls: document_urls,
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
                  {...register(field.name)}
                  disabled={
                    field.type === "file" && (isDocumentUploading || isDocumentDeleting)
                  }
                  onChange={handleFileUpload(uploadDocuments)}
                  type={field.type}
                  {...(field.type === "file" && { multiple: true })}
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
              {document_urls?.map((url, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-gray-200">{url}</span>
                  <button
                    onClick={() => deleteDocument(url)}
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
              <LuLogIn />
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
