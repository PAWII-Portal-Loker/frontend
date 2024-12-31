import { CreateApplicationSchema } from "@application/schemas/create";
import { CreateApplicationFormDto } from "@application/types/create";
import { FieldConfig } from "@types";

export const CreateApplicationField: FieldConfig<CreateApplicationFormDto>[] = [
  {
    name: "document_urls",
    label: "Documents",
    type: "file",
    placeholder: "Select documents",
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
