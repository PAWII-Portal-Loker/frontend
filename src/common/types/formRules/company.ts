import * as yup from "yup";
import FieldConfig from "../fieldConfig";

export interface FormValues {
  company_type: string;
  company_name: string;
  founding_date: Date;
  employee_total: number;
  early_working_hour: string;
  end_working_hour: string;
}

export const schema = yup.object().shape({
  company_type: yup.string().required("Company type is required"),
  company_name: yup.string().required("Company name is required"),
  founding_date: yup.date().required("Founding date is required"),
  employee_total: yup
    .number()
    .required("Employee total is required")
    .positive("Employee total must be a positive number"),
  early_working_hour: yup
    .string()
    .matches(
      /^(?:[0-1]\d|2[0-3]):[0-5][0-9]$/,
      "Invalid early working hour format (HH:MM)",
    )
    .required("Early working hour is required")
    .test(
      "max-time",
      "Working hours cannot exceed 23:59",
      (value) => (value ?? "") <= "23:59",
    ),
  end_working_hour: yup
    .string()
    .matches(
      /^(?:[0-1]\d|2[0-3]):[0-5][0-9]$/,
      "Invalid end working hour format (HH:MM)",
    )
    .required("End working hour is required")
    .test(
      "max-time",
      "Working hours cannot exceed 23:59",
      (value) => (value ?? "") <= "23:59",
    ),
});

export const fields: FieldConfig<FormValues>[] = [
  {
    name: "company_type",
    label: "Company Type",
    type: "select",
    placeholder: "Enter your company type",
    rules: schema.fields.company_type,
  },
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
    placeholder: "Enter your company name",
    rules: schema.fields.company_name,
  },
  {
    name: "founding_date",
    label: "Founding Date",
    type: "date",
    placeholder: "Enter your founding date",
    rules: schema.fields.founding_date,
  },
  {
    name: "employee_total",
    label: "Employee Total",
    type: "number",
    placeholder: "Enter your employee total",
    rules: schema.fields.employee_total,
  },
  {
    name: "early_working_hour",
    label: "Early Working Hour (HH:MM)",
    type: "text",
    placeholder: "Enter your early working hour (HH:MM)",
    rules: schema.fields.early_working_hour,
  },
  {
    name: "end_working_hour",
    label: "End Working Hour (HH:MM)",
    type: "text",
    placeholder: "Enter your end working hour (HH:MM)",
    rules: schema.fields.end_working_hour,
  },
];
