import FieldConfig from "@/common/types/fieldConfig";
import { CreateJobSeekerDto, UpdateJobSeekerDto } from "./type";
import * as Yup from "yup";
import { LAST_EDUCATION_TYPE } from "../enums/types/lastEducationTypes";

export const JobSeekerCreateSchema = Yup.object({
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

export const JobSeekerCreateField: FieldConfig<CreateJobSeekerDto>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    rules: JobSeekerCreateSchema.fields.name,
  },
  {
    name: "last_education",
    label: "Last Education",
    type: "select",
    placeholder: "Select your last education",
    rules: JobSeekerCreateSchema.fields.last_education,
  },
  {
    name: "major",
    label: "Major",
    type: "text",
    placeholder: "Enter your major",
    rules: JobSeekerCreateSchema.fields.major,
  },
  {
    name: "gpa",
    label: "GPA",
    type: "number",
    placeholder: "Enter your GPA",
    rules: JobSeekerCreateSchema.fields.gpa,
  },
];

export const JobSeekerUpdateSchema = Yup.object({
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

export const JobSeekerUpdateField: FieldConfig<UpdateJobSeekerDto>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    rules: JobSeekerUpdateSchema.fields.name,
  },
  {
    name: "last_education",
    label: "Last Education",
    type: "select",
    placeholder: "Select your last education",
    rules: JobSeekerUpdateSchema.fields.last_education,
  },
  {
    name: "major",
    label: "Major",
    type: "text",
    placeholder: "Enter your major",
    rules: JobSeekerUpdateSchema.fields.major,
  },
  {
    name: "gpa",
    label: "GPA",
    type: "number",
    placeholder: "Enter your GPA",
    rules: JobSeekerUpdateSchema.fields.gpa,
  },
];
