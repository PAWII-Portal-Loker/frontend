import { CreateApplicationSchema } from "@application/schemas/create";
import { CreateApplicationDto } from "@application/types/create";
import { FieldConfig } from "@types";

export const CreateApplicationField: FieldConfig<CreateApplicationDto>[] = [
  {
    name: "document_urls",
    label: "Document URLs",
    type: "file",
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
