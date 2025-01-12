import { CreateVacancyFormDto } from "../types/create";
import { CreateVacancySchema } from "../schemas/create";
import { FieldConfig } from "@types";

export const CreateVacancyField: FieldConfig<CreateVacancyFormDto>[] = [
  {
    name: "job_type",
    label: "Job Type",
    type: "select",
    placeholder: "Select job type",
    rules: CreateVacancySchema.fields.job_type,
  },
  {
    name: "income_type",
    label: "Income Type",
    type: "select",
    placeholder: "Select income type",
    rules: CreateVacancySchema.fields.income_type,
  },
  {
    name: "position",
    label: "Position",
    type: "text",
    placeholder: "Enter position",
    rules: CreateVacancySchema.fields.position,
  },
  {
    name: "document_urls",
    label: "Thumbnail URL",
    type: "file",
    placeholder: "Upload thumbnail file",
    rules: CreateVacancySchema.fields.document_urls,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter description",
    rules: CreateVacancySchema.fields.description,
  },
];
