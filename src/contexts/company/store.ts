import { CompanyDto, CompanyStoreState } from "./type";
import { create } from "zustand";
import CompanyService from "./service";
import { toaster } from "@/components/ui/toaster";
import useRoleDialogStore from "@/hooks/roleDialog/store";
import useAuthStore from "../(auth)/store";
import { DefaultUserDto } from "../user/store";

export const DefaultCompanyDto: CompanyDto = {
  id: "",
  user: DefaultUserDto,
  company_type: "",
  company_name: "",
  founding_date: new Date(),
  employee_total: 0,
  early_working_hour: "",
  end_working_hour: "",
  created_at: new Date(),
  updated_at: new Date(),
};

const companyService = new CompanyService();

const { setIsRoleDialogOpen } = useRoleDialogStore.getState();
const { checkLogin } = useAuthStore.getState();

export const useCompanyStore = create<CompanyStoreState>((set, get) => ({
  companies: [],
  isCompaniesLoading: false,
  company: DefaultCompanyDto,
  isCompanyLoading: false,

  setCompanies: (companies) => set({ companies }),
  setIsCompaniesLoading: (isCompaniesLoading) => set({ isCompaniesLoading }),
  setCompany: (company) => set({ company }),
  setIsCompanyLoading: (isCompanyLoading) => set({ isCompanyLoading }),

  getCompanies: () => {
    get().setIsCompaniesLoading(true);

    companyService.getCompanies({
      onSuccess: (companies) => {
        get().setCompanies(companies);
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to get companies",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsCompaniesLoading(false);
      },
    });
  },

  getCompany: (id) => {
    get().setIsCompanyLoading(true);

    companyService.getCompany(id, {
      onSuccess: (company) => {
        get().setCompany(company);
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to get company",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsCompanyLoading(false);
      },
    });
  },

  createCompany: (request) => {
    get().setIsCompanyLoading(true);

    companyService.createCompany(request, {
      onSuccess: () => {
        toaster.create({
          title: `Company ${request.company_name} created`,
          type: "success",
          duration: 3000,
        });
        setIsRoleDialogOpen(false);
        checkLogin();
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to create company",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsCompanyLoading(false);
      },
    });
  },

  updateCompany: (request) => {
    get().setIsCompanyLoading(true);

    companyService.updateCompany(request, {
      onSuccess: () => {
        toaster.create({
          title: "Company updated",
          type: "success",
          duration: 3000,
        });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to update company",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsCompanyLoading(false);
      },
    });
  },
}));
