import { create } from "zustand";
import { CompanyDto } from "./types";
import { DefaultUserDto } from "@user/store";
import CompanyService from "./service";
import useRoleDialogStore from "@hooks/roleDialog/store";
import useAuthStore from "@auth/store";
import { CompanyStoreState } from "./types/storeState";
import { toaster } from "@components/ui/toaster";

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

const { setRoleDialogOpen } = useRoleDialogStore.getState();
const { checkLogin } = useAuthStore.getState();

export const useCompanyStore = create<CompanyStoreState>((set, get) => ({
  companies: [],
  isCompaniesLoading: false,
  company: DefaultCompanyDto,
  isCompanyLoading: false,

  setCompanies: (companies) => set({ companies }),
  setCompaniesLoading: (isCompaniesLoading) => set({ isCompaniesLoading }),
  setCompany: (company) => set({ company }),
  setCompanyLoading: (isCompanyLoading) => set({ isCompanyLoading }),

  getCompanies: () => {
    get().setCompaniesLoading(true);

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
        get().setCompaniesLoading(false);
      },
    });
  },

  getCompany: (id) => {
    get().setCompanyLoading(true);

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
        get().setCompanyLoading(false);
      },
    });
  },

  createCompany: (request) => {
    get().setCompanyLoading(true);

    companyService.createCompany(request, {
      onSuccess: () => {
        toaster.create({
          title: `Company ${request.company_name} created`,
          type: "success",
          duration: 3000,
        });
        setRoleDialogOpen(false);
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
        get().setCompanyLoading(false);
      },
    });
  },

  updateCompany: (request) => {
    get().setCompanyLoading(true);

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
        get().setCompanyLoading(false);
      },
    });
  },
}));
