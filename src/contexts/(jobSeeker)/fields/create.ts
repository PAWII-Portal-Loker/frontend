import { CreateJobSeekerDto } from "../types/create";
import { CreateJobSeekerSchema } from "../schemas/create";
import { FieldConfig } from "@types";

export const CreateJobSeekerField: FieldConfig<CreateJobSeekerDto>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    rules: CreateJobSeekerSchema.fields.name,
  },
  {
    name: "last_education",
    label: "Last Education",
    type: "select",
    placeholder: "Select your last education",
    rules: CreateJobSeekerSchema.fields.last_education,
  },
  {
    name: "major",
    label: "Major",
    type: "text",
    placeholder: "Enter your major",
    rules: CreateJobSeekerSchema.fields.major,
  },
  {
    name: "gpa",
    label: "GPA",
    type: "number",
    placeholder: "Enter your GPA",
    rules: CreateJobSeekerSchema.fields.gpa,
  },
];
