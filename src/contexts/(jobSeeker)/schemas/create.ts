import { LAST_EDUCATION_TYPE } from "@enums/types/lastEducationTypes";
import { CreateJobSeekerDto } from "@jobSeeker/types/create";
import * as Yup from "yup";

export const CreateJobSeekerSchema: Yup.ObjectSchema<CreateJobSeekerDto> =
  Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must be at most 100 characters"),

    last_education: Yup.string()
      .required("Last education is required")
      .oneOf(
        LAST_EDUCATION_TYPE,
        `Invalid last education, must be one of "${LAST_EDUCATION_TYPE.join(
          ", ",
        )}"`,
      ),

    major: Yup.string().required("Major is required"),

    gpa: Yup.number()
      .required("GPA is required")
      .test("is-decimal", "GPA must be decimal", (value) => {
        return /^\d+(\.\d+)?$/.test(value.toString());
      }),
  })
    .noUnknown(true)
    .strict(true);
