import { CompanyRequestEntity } from "./type";
import { useCompanyStore } from "./state";
import useRoleDialogStore from "@/hooks/(roleDialog)/reducer";
import { toaster } from "@/components/ui/toaster";
import CompanyService from "./service";
import useAuthStore from "../(auth)/state";

const companyService = new CompanyService();

export class CompanyReducer {}
export const fetchData = () => {
  const { setIsLoading, setData } = useCompanyStore.getState();

  setIsLoading(true);

  companyService.getAll({
    onSuccess: (data) => {
      setData(data);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch company",
        description: message,
        type: "error",
        duration: 3000,
      });
    },
    onFullfilled() {
      setIsLoading(false);
    },
  });
};

export const fetchSingleData = (id: string) => {
  const { setIsLoading, setSingleData } = useCompanyStore.getState();

  setIsLoading(true);

  companyService.getOne(id, {
    onSuccess: (singleData) => {
      setSingleData(singleData);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch company",
        description: message,
        type: "error",
        duration: 3000,
      });
    },
    onFullfilled() {
      setIsLoading(false);
    },
  });
};

export const createData = (request: CompanyRequestEntity) => {
  const { setIsLoading } = useCompanyStore.getState();

  setIsLoading(true);

  companyService.create(request, {
    onSuccess: () => {
      toaster.create({
        title: `Company ${request.company_name} created`,
        type: "success",
        duration: 3000,
      });
      useRoleDialogStore.getState().setIsRoleDialogOpen(false);
      useAuthStore.getState().checkLogin();
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
      setIsLoading(false);
    },
  });
};

export const updateData = (request: CompanyRequestEntity) => {
  const { setIsLoading } = useCompanyStore.getState();

  setIsLoading(true);

  companyService.update(request, {
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
      setIsLoading(false);
    },
  });
};
