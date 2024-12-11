import FieldConfig from "@/common/types/fieldConfig";
import { UpdateVacancyDto } from "../types/update";
import { UpdateVacancySchema } from "../schemas/update";

export const UpdateVacancyField: FieldConfig<UpdateVacancyDto>[] = [
  {
    name: "job_type",
    label: "Job Type",
    type: "select",
    placeholder: "Select job type",
    rules: UpdateVacancySchema.fields.job_type,
  },
  {
    name: "income_type",
    label: "Income Type",
    type: "select",
    placeholder: "Select income type",
    rules: UpdateVacancySchema.fields.income_type,
  },
  {
    name: "position",
    label: "Position",
    type: "text",
    placeholder: "Enter position",
    rules: UpdateVacancySchema.fields.position,
  },
  {
    name: "thumbnail_url",
    label: "Thumbnail URL",
    type: "file",
    placeholder: "Upload thumbnail file",
    rules: UpdateVacancySchema.fields.thumbnail_url,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter description",
    rules: UpdateVacancySchema.fields.description,
  },
];
