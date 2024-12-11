import FieldConfig from "@/common/types/fieldConfig";
import { CreateCompanyDto } from "../types/create";
import { CreateCompanySchema } from "../schemas/create";

export const CreateCompanyField: FieldConfig<CreateCompanyDto>[] = [
  {
    name: "company_type",
    label: "Company Type",
    type: "select",
    placeholder: "Enter your company type",
    rules: CreateCompanySchema.fields.company_type,
  },
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
    placeholder: "Enter your company name",
    rules: CreateCompanySchema.fields.company_name,
  },
  {
    name: "founding_date",
    label: "Founding Date",
    type: "date",
    placeholder: "Enter your founding date",
    rules: CreateCompanySchema.fields.founding_date,
  },
  {
    name: "employee_total",
    label: "Employee Total",
    type: "number",
    placeholder: "Enter your employee total",
    rules: CreateCompanySchema.fields.employee_total,
  },
  {
    name: "early_working_hour",
    label: "Early Working Hour (HH:MM)",
    type: "text",
    placeholder: "Enter your early working hour (HH:MM)",
    rules: CreateCompanySchema.fields.early_working_hour,
  },
  {
    name: "end_working_hour",
    label: "End Working Hour (HH:MM)",
    type: "text",
    placeholder: "Enter your end working hour (HH:MM)",
    rules: CreateCompanySchema.fields.end_working_hour,
  },
];
