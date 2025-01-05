import { INCOME_TYPES } from "@enums/types/incomeTypes";
import { JOB_TYPES } from "@enums/types/jobTypes";
import { UpdateVacancyDto } from "@vacancy/types/update";
import * as Yup from "yup";

export const UpdateVacancySchema: Yup.ObjectSchema<UpdateVacancyDto> =
  Yup.object({
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

    thumbnail_url: Yup.string().required("Thumbnail URL is required"),

    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
  })
    .noUnknown(true)
    .strict(true);
