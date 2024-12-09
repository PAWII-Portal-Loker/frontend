export interface ConstEntity {
  company_types: string[];
  income_types: string[];
  job_types: string[];
  roles: string[];
}

export const defaultConstEntity: ConstEntity = {
  company_types: [],
  income_types: [],
  job_types: [],
  roles: [],
};
