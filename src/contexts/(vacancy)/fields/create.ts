import FieldConfig from "@/common/types/fieldConfig";
import { CreateVacancyDto } from "../types/create";
import { CreateVacancySchema } from "../schemas/create";

export const CreateVacancyField: FieldConfig<CreateVacancyDto>[] = [
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
    name: "thumbnail_url",
    label: "Thumbnail URL",
    type: "file",
    placeholder: "Upload thumbnail file",
    rules: CreateVacancySchema.fields.thumbnail_url,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter description",
    rules: CreateVacancySchema.fields.description,
  },
];
