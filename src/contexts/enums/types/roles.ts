export type RolesEnum = string;

export const ROLE_JOB_SEEKER: RolesEnum = "Job Seeker";
export const ROLE_COMPANY: RolesEnum = "Company";

export const ROLES = [ROLE_JOB_SEEKER, ROLE_COMPANY];

export type RoleDto = string;

export type RoleStoreState = {
  roles: RoleDto[];
  isRolesLoading: boolean;

  setRoles: (roles: RoleDto[]) => void;
  setRolesLoading: (isRolesLoading: boolean) => void;
  getRoles: () => void;
};
