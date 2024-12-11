import { UserDto } from "../user/type";

export interface CompanyDto {
  id: string;
  user: UserDto;
  company_type: string;
  company_name: string;
  founding_date: Date;
  employee_total: number;
  early_working_hour: string;
  end_working_hour: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCompanyDto {
  company_type: CompanyDto["company_type"];
  company_name: CompanyDto["company_name"];
  founding_date: string;
  employee_total: CompanyDto["employee_total"];
  early_working_hour: CompanyDto["early_working_hour"];
  end_working_hour: CompanyDto["end_working_hour"];
}

export interface UpdateCompanyDto {
  company_type: CompanyDto["company_type"];
  company_name: CompanyDto["company_name"];
  founding_date: string;
  employee_total: CompanyDto["employee_total"];
  early_working_hour: CompanyDto["early_working_hour"];
  end_working_hour: CompanyDto["end_working_hour"];
}

export interface CompanyStoreState {
  companies: CompanyDto[];
  isCompaniesLoading: boolean;
  company: CompanyDto;
  isCompanyLoading: boolean;

  setCompanies: (companies: CompanyDto[]) => void;
  setIsCompaniesLoading: (isCompaniesLoading: boolean) => void;
  setCompany: (company: CompanyDto) => void;
  setIsCompanyLoading: (isCompanyLoading: boolean) => void;
  getCompanies: () => void;
  getCompany: (id: string) => void;
  createCompany: (request: CreateCompanyDto) => void;
  updateCompany: (request: UpdateCompanyDto) => void;
}
