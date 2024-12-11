import * as Yup from "yup";
import { CreateCompanyDto, UpdateCompanyDto } from "./type";
import FieldConfig from "@/common/types/fieldConfig";
import { COMPANY_TYPES } from "../enums/types/companyTypes";

export const CreateCompanySchema = Yup.object({
  company_type: Yup.string()
    .required("Company type is required")
    .oneOf(
      COMPANY_TYPES,
      `Invalid company type, must be one of "${COMPANY_TYPES.join(", ")}"`,
    ),

  company_name: Yup.string()
    .required("Company name is required")
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name must be at most 100 characters"),

  founding_date: Yup.string()
    .required("Founding date is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Invalid founding date format (YYYY-MM-DD)",
    ),

  employee_total: Yup.number()
    .required("Employee total is required")
    .min(1, "Employee total must be at least 1"),

  early_working_hour: Yup.string()
    .required("Early working hour is required")
    .matches(
      /^(?:[0-1]\d|2[0-3]):[0-5][0-9]$/,
      "Invalid early working hour format (HH:MM)",
    )
    .test(
      "max-time",
      "Working hours cannot exceed 23:59",
      (value) => (value ?? "") <= "23:59",
    ),

  end_working_hour: Yup.string()
    .required("End working hour is required")
    .matches(
      /^(?:[0-1]\d|2[0-3]):[0-5][0-9]$/,
      "Invalid end working hour format (HH:MM)",
    )
    .test(
      "max-time",
      "Working hours cannot exceed 23:59",
      (value) => (value ?? "") <= "23:59",
    ),
})
  .noUnknown(true)
  .strict(true);

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

export const UpdateCompanySchema = Yup.object({
  company_type: Yup.string()
    .required("Company type is required")
    .oneOf(
      COMPANY_TYPES,
      `Invalid company type, must be one of "${COMPANY_TYPES.join(", ")}"`,
    ),

  company_name: Yup.string()
    .required("Company name is required")
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name must be at most 100 characters"),

  founding_date: Yup.string()
    .required("Founding date is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Invalid founding date format (YYYY-MM-DD)",
    ),

  employee_total: Yup.number()
    .required("Employee total is required")
    .min(1, "Employee total must be at least 1"),

  early_working_hour: Yup.string()
    .required("Early working hour is required")
    .matches(
      /^(?:[0-1]\d|2[0-3]):[0-5][0-9]$/,
      "Invalid early working hour format (HH:MM)",
    )
    .test(
      "max-time",
      "Working hours cannot exceed 23:59",
      (value) => (value ?? "") <= "23:59",
    ),

  end_working_hour: Yup.string()
    .required("End working hour is required")
    .matches(
      /^(?:[0-1]\d|2[0-3]):[0-5][0-9]$/,
      "Invalid end working hour format (HH:MM)",
    )
    .test(
      "max-time",
      "Working hours cannot exceed 23:59",
      (value) => (value ?? "") <= "23:59",
    ),
})
  .noUnknown(true)
  .strict(true);

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
