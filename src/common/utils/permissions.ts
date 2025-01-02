import { AuthDto } from "@auth/types";

const rolePermissions = {
  Company: [
    "vacancy:create",
    "vacancy:view",
    "vacancy:update",
    "vacancy:updateStatus",
    "myVacancies:view",
    "companyDashboard:view",
    "application:view",
  ],
  "Job Seeker": [
    "vacancy:view",
    "jobSeekerDashboard:view",
    "myApplications:view",
    "application:create",
  ],
};

export const hasPermission = (
  auth: AuthDto,
  permission: string,
  resourceId?: string
): boolean => {
  if (!auth.role) {
    return false;
  }

  const allowedPermissions = rolePermissions[auth.role] || [];

  if (!allowedPermissions.includes(permission)) {
    return false;
  }

  if (resourceId && resourceId === auth.id) {
    return true;
  }

  return allowedPermissions.includes(permission);
};
