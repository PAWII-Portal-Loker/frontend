import { CompanyDto } from ".";
import { CreateCompanyDto } from "./create";
import { UpdateCompanyDto } from "./update";

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
