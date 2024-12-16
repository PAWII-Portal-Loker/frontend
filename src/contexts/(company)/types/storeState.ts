import { CompanyDto } from ".";
import { CreateCompanyDto } from "./create";
import { UpdateCompanyDto } from "./update";

export interface CompanyStoreState {
  companies: CompanyDto[];
  isCompaniesLoading: boolean;
  company: CompanyDto;
  isCompanyLoading: boolean;

  setCompanies: (companies: CompanyDto[]) => void;
  setCompaniesLoading: (isCompaniesLoading: boolean) => void;
  setCompany: (company: CompanyDto) => void;
  setCompanyLoading: (isCompanyLoading: boolean) => void;
  getCompanies: () => void;
  getCompany: (id: string) => void;
  createCompany: (request: CreateCompanyDto) => void;
  updateCompany: (request: UpdateCompanyDto) => void;
}
