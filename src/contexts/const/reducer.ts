import { toaster } from "@/components/ui/toaster";
import ConstService from "./service";
import {
  useCompanyTypeStore,
  useConstStore,
  useIncomeTypeStore,
  useJobTypeStore,
  useRoleStore,
} from "./state";

const constService = new ConstService();

export const fetchConsts = () => {
  const { setIsConstsLoading, setConsts } = useConstStore.getState();

  setIsConstsLoading(true);

  constService.getConsts({
    onSuccess: (consts) => {
      setConsts(consts);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch const",
        description: message,
        type: "error",
        duration: 3000,
      });
    },
    onFullfilled() {
      setIsConstsLoading(false);
    },
  });
};

export const fetchCompanyTypesData = () => {
  const { setIsLoading, setData } = useCompanyTypeStore.getState();

  setIsLoading(true);

  constService.getCompanyTypes({
    onSuccess: (data) => {
      setData(data);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch company types",
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

export const fetchIncomeTypesData = () => {
  const { setIsLoading, setData } = useIncomeTypeStore.getState();

  setIsLoading(true);

  constService.getIncomeTypes({
    onSuccess: (data) => {
      setData(data);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch income types",
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

export const fetchJobTypesData = () => {
  const { setIsLoading, setData } = useJobTypeStore.getState();

  setIsLoading(true);

  constService.getJobTypes({
    onSuccess: (data) => {
      setData(data);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch job types",
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

export const fetchRolesData = () => {
  const { setIsLoading, setData } = useRoleStore.getState();

  setIsLoading(true);

  constService.getRoles({
    onSuccess: (data) => {
      setData(data);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch roles",
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
