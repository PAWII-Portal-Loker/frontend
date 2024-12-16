import { UpdateCompanyDto } from "../types/update";
import { UpdateCompanySchema } from "../schemas/update";
import { FieldConfig } from "@types";

export const UpdateCompanyField: FieldConfig<UpdateCompanyDto>[] = [
  {
    name: "company_type",
    label: "Company Type",
    type: "select",
    placeholder: "Enter your company type",
    rules: UpdateCompanySchema.fields.company_type,
  },
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
    placeholder: "Enter your company name",
    rules: UpdateCompanySchema.fields.company_name,
  },
  {
    name: "founding_date",
    label: "Founding Date",
    type: "date",
    placeholder: "Enter your founding date",
    rules: UpdateCompanySchema.fields.founding_date,
  },
  {
    name: "employee_total",
    label: "Employee Total",
    type: "number",
    placeholder: "Enter your employee total",
    rules: UpdateCompanySchema.fields.employee_total,
  },
  {
    name: "early_working_hour",
    label: "Early Working Hour (HH:MM)",
    type: "text",
    placeholder: "Enter your early working hour (HH:MM)",
    rules: UpdateCompanySchema.fields.early_working_hour,
  },
  {
    name: "end_working_hour",
    label: "End Working Hour (HH:MM)",
    type: "text",
    placeholder: "Enter your end working hour (HH:MM)",
    rules: UpdateCompanySchema.fields.end_working_hour,
  },
];
