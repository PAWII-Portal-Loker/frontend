import FieldConfig from "@/common/types/fieldConfig";
import { DefaultUserDto } from "../(auth)/util";
import { JobSeekerCreateDto, JobSeekerDto } from "./type";
import * as Yup from "yup";
import { LAST_EDUCATION_TYPE } from "../enums/types/lastEducationTypes";

export const DefaultJobSeekerDto: JobSeekerDto = {
  id: "",
  user: DefaultUserDto,
  name: "",
  last_education: "",
  major: "",
  gpa: 0,
  created_at: new Date(),
  updated_at: new Date(),
};

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
});

export const JobSeekerCreateField: FieldConfig<JobSeekerCreateDto>[] = [
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
