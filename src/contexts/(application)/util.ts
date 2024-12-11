import * as Yup from "yup";
import { CreateApplicationDto } from "./type";
import FieldConfig from "@/common/types/fieldConfig";

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

export const CreateApplicationField: FieldConfig<CreateApplicationDto>[] = [
  {
    name: "vacancy_id",
    label: "Vacancy",
    type: "select",
    placeholder: "Select a vacancy",
    rules: CreateApplicationSchema.fields.vacancy_id,
  },
  {
    name: "document_urls",
    label: "Document URLs",
    type: "text",
    placeholder: "Enter document URLs",
    rules: CreateApplicationSchema.fields.document_urls,
  },
  {
    name: "message",
    label: "Message",
    type: "text",
    placeholder: "Enter your message",
    rules: CreateApplicationSchema.fields.message,
  },
];
