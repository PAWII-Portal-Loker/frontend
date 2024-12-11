import FieldConfig from "@/common/types/fieldConfig";
import {
  CreateVacancyDto,
  UpdateVacancyDto,
  updateVacancyStatusDto,
} from "./type";
import * as Yup from "yup";
import { JOB_TYPES } from "../enums/types/jobTypes";
import { INCOME_TYPES } from "../enums/types/incomeTypes";

export const CreateVacancySchema = Yup.object({
  job_type: Yup.string()
    .required("Job type is required")
    .oneOf(
      JOB_TYPES,
      `Invalid job type, must be one of "${JOB_TYPES.join(", ")}"`,
    ),
  income_type: Yup.string()
    .required("Income type is required")
    .oneOf(
      INCOME_TYPES,
      `Invalid income type, must be one of "${INCOME_TYPES.join(", ")}"`,
    ),
  position: Yup.string()
    .required("Position is required")
    .min(3, "Position must be at least 3 characters")
    .max(100, "Position must be at most 100 characters"),
  thumbnail_url: Yup.string().optional(),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
})
  .noUnknown(true)
  .strict(true);

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

export const UpdateVacancySchema = Yup.object({
  job_type: Yup.string()
    .required("Job type is required")
    .oneOf(
      JOB_TYPES,
      `Invalid job type, must be one of "${JOB_TYPES.join(", ")}"`,
    ),
  income_type: Yup.string()
    .required("Income type is required")
    .oneOf(
      INCOME_TYPES,
      `Invalid income type, must be one of "${INCOME_TYPES.join(", ")}"`,
    ),
  position: Yup.string()
    .required("Position is required")
    .min(3, "Position must be at least 3 characters")
    .max(100, "Position must be at most 100 characters"),
  thumbnail_url: Yup.string().optional(),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
})
  .noUnknown(true)
  .strict(true);

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

export const UpdateVacancyStatusSchema = Yup.object({
  is_closed: Yup.boolean().required("Status is required"),
})
  .noUnknown(true)
  .strict(true);

export const UpdateVacancyStatusField: FieldConfig<updateVacancyStatusDto>[] = [
  {
    name: "is_closed",
    label: "Status",
    type: "checkbox",
    placeholder: "Select status",
    rules: UpdateVacancyStatusSchema.fields.is_closed,
  },
];
