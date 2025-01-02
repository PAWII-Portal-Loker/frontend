import { AuthDto } from "@auth/types";

type Resource =
  | "vacancy"
  | "companyDashboard"
  | "application"
  | "jobSeekerDashboard"
  | "myApplications"
  | "myVacancies";
type Action = "create" | "view" | "update" | "updateStatus" | "delete";

const resourcePermissions: Record<
  Resource,
  { [key in Exclude<AuthDto["role"], null>]?: Action[] }
> = {
  vacancy: {
    Company: ["create", "view", "update", "updateStatus"],
    "Job Seeker": ["view"],
  },
  companyDashboard: {
    Company: ["view"],
  },
  application: {
    Company: ["view"],
    "Job Seeker": ["create"],
  },
  jobSeekerDashboard: {
    "Job Seeker": ["view"],
  },
  myApplications: {
    "Job Seeker": ["view"],
  },
  myVacancies: {
    Company: ["view"],
  },
};

const ownedResources: { [key in Exclude<AuthDto["role"], null>]?: Resource[] } =
  {
    Company: ["vacancy"],
    "Job Seeker": ["application"],
  };

export const hasPermission = (
  auth: AuthDto,
  resource: Resource,
  action: Action,
  resourceId?: string
): boolean => {
  if (!auth.role) {
    return false;
  }

  const allowedPermissions =
    resourcePermissions[resource]?.[
      auth.role as Exclude<AuthDto["role"], null>
    ] || [];

  if (!allowedPermissions.includes(action)) {
    return false;
  }

  if (
    resourceId &&
    ownedResources[auth.role]?.includes(resource) &&
    resourceId !== auth.id
  ) {
    return false;
  }

  return true;
};
