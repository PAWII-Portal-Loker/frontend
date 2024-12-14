export interface RoleDialogStoreState {
  isRoleDialogOpen: boolean;
  selectedRole: "JOB_SEEKER" | "COMPANY" | null;
  isLoading: boolean;

  setRoleDialogOpen: (isOpen: boolean) => void;
  setSelectedRole: (role: "JOB_SEEKER" | "COMPANY") => void;
  setLoading: (loading: boolean) => void;
}
