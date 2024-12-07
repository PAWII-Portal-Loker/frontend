export interface RoleDialogState {
  selectedRole: "JOB_SEEKER" | "COMPANY" | null;
}

export interface RoleDialogActions {
  setSelectedRole: (role: "JOB_SEEKER" | "COMPANY") => void;
}
