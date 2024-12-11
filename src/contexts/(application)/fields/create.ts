import FieldConfig from "@/common/types/fieldConfig";
import { CreateApplicationDto } from "../types/create";
import { CreateApplicationSchema } from "../schemas/create";

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
