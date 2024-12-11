import { CompanyDto } from ".";

export interface UpdateCompanyDto {
  company_type: CompanyDto["company_type"];
  company_name: CompanyDto["company_name"];
  founding_date: string;
  employee_total: CompanyDto["employee_total"];
  early_working_hour: CompanyDto["early_working_hour"];
  end_working_hour: CompanyDto["end_working_hour"];
}
