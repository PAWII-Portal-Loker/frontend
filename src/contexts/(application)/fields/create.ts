import { CreateApplicationSchema } from "@application/schemas/create";
import { CreateApplicationFormDto } from "@application/types/create";
import { FieldConfig } from "@types";

export const CreateApplicationField: FieldConfig<CreateApplicationFormDto>[] = [
  {
    name: "message",
    label: "Message",
    type: "text",
    placeholder: "Enter your message",
    rules: CreateApplicationSchema.fields.message,
  },
  {
    name: "document_urls",
    label: "Documents",
    type: "file",
    placeholder: "Drag and drop your documents here",
    rules: CreateApplicationSchema.fields.document_urls,
  },
];
