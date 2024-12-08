import { CompanyRequestEntity } from "@/contexts/company/type";
import { JobSeekerRequestEntity } from "@/contexts/jobSeeker/type";

export interface RoleDialogState {
  isRoleDialogOpen: boolean;
  selectedRole: "JOB_SEEKER" | "COMPANY" | null;
  isLoading: boolean;
}

export interface RoleDialogActions {
  setIsRoleDialogOpen: (isOpen: boolean) => void;
  setSelectedRole: (role: "JOB_SEEKER" | "COMPANY") => void;
  setIsLoading: (loading: boolean) => void;
  createCompanyRole: (request: CompanyRequestEntity) => void;
  createJobSeekerRole: (request: JobSeekerRequestEntity) => void;
}
