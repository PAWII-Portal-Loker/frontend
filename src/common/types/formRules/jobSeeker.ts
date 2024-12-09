import * as yup from "yup";
import FieldConfig from "../fieldConfig";

export type FormValues = {
  name: string;
  last_education: string;
  major: string;
  gpa: number;
};

export const schema = yup.object({
  name: yup.string().required("Name is required"),
  last_education: yup.string().required("Last education is required"),
  major: yup.string().required("Major is required"),
  gpa: yup
    .number()
    .required("GPA is required")
    .positive("GPA must be a positive number")
    .max(4, "GPA cannot be greater than 4"),
});

export const fields: FieldConfig<FormValues>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    rules: schema.fields.name,
  },
  {
    name: "last_education",
    label: "Last Education",
    type: "text",
    placeholder: "Enter your last education",
    rules: schema.fields.last_education,
  },
  {
    name: "major",
    label: "Major",
    type: "text",
    placeholder: "Enter your major",
    rules: schema.fields.major,
  },
  {
    name: "gpa",
    label: "GPA",
    type: "number",
    placeholder: "Enter your GPA",
    rules: schema.fields.gpa,
  },
];
