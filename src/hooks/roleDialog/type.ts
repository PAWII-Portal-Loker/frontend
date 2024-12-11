export interface RoleDialogStoreState {
  isRoleDialogOpen: boolean;
  selectedRole: "JOB_SEEKER" | "COMPANY" | null;
  isLoading: boolean;

  setIsRoleDialogOpen: (isOpen: boolean) => void;
  setSelectedRole: (role: "JOB_SEEKER" | "COMPANY") => void;
  setIsLoading: (loading: boolean) => void;
}
