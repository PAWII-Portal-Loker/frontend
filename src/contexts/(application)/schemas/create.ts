import * as Yup from "yup";

export const CreateApplicationSchema = Yup.object({
  vacancy_id: Yup.string()
    .required("Vacancy is required")
    .length(24, "Vacancy ID must be 24 characters"),
  document_urls: Yup.array()
    .of(Yup.string().url("Document URL must be a valid URL").required())
    .optional(),
  message: Yup.string()
    .required("Message is required")
    .min(3, "Message must be at least 3 characters"),
})
  .noUnknown(true)
  .strict(true);
