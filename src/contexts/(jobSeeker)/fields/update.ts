import { UpdateJobSeekerDto } from "../types/update";
import { UpdateJobSeekerSchema } from "../schemas/update";
import { FieldConfig } from "@types";

export const UpdateJobSeekerField: FieldConfig<UpdateJobSeekerDto>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    rules: UpdateJobSeekerSchema.fields.name,
  },
  {
    name: "last_education",
    label: "Last Education",
    type: "select",
    placeholder: "Select your last education",
    rules: UpdateJobSeekerSchema.fields.last_education,
  },
  {
    name: "major",
    label: "Major",
    type: "text",
    placeholder: "Enter your major",
    rules: UpdateJobSeekerSchema.fields.major,
  },
  {
    name: "gpa",
    label: "GPA",
    type: "number",
    placeholder: "Enter your GPA",
    rules: UpdateJobSeekerSchema.fields.gpa,
  },
];
