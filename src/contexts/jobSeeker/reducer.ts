import { toaster } from "@/components/ui/toaster";
import JobSeekerService from "./service";
import { useJobSeekerStore } from "./state";
import { JobSeekerRequestEntity } from "./type";
import useRoleDialogStore from "@/hooks/(roleDialog)/reducer";
import useAuthStore from "../(auth)/state";

const jobSeekerService = new JobSeekerService();

export const fetchData = () => {
  const { setIsLoading, setData } = useJobSeekerStore.getState();
  setIsLoading(true);

  jobSeekerService.getAll({
    onSuccess: (data) => {
      setData(data);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch job Seeker",
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
  const { setIsLoading, setSingleData } = useJobSeekerStore.getState();
  setIsLoading(true);

  jobSeekerService.getOne(id, {
    onSuccess: (singleData) => {
      setSingleData(singleData);
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to fetch job seeker",
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

export const createData = (request: JobSeekerRequestEntity) => {
  const { setIsLoading } = useJobSeekerStore.getState();
  const { setIsRoleDialogOpen } = useRoleDialogStore.getState();
  const { checkLogin } = useAuthStore.getState();
  setIsLoading(true);

  jobSeekerService.create(request, {
    onSuccess: () => {
      toaster.create({
        title: `Job seeker ${request.name} created`,
        type: "success",
        duration: 3000,
      });
      setIsRoleDialogOpen(false);
      checkLogin();
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to create job seeker",
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

export const updateData = (request: JobSeekerRequestEntity) => {
  const { setIsLoading } = useJobSeekerStore.getState();
  setIsLoading(true);

  jobSeekerService.update(request as JobSeekerRequestEntity, {
    onSuccess: () => {
      toaster.create({
        title: "Job seeker updated",
        type: "success",
        duration: 3000,
      });
    },
    onError: (message: string) => {
      toaster.create({
        title: "Failed to update job seeker",
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
