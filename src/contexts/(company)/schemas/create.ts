import { COMPANY_TYPES } from "@/contexts/enums/types/companyTypes";
import * as Yup from "yup";

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
