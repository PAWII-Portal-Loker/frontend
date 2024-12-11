export interface ConstDto {
  company_types: string[];
  income_types: string[];
  job_types: string[];
  roles: string[];
}

export type ConstStoreState = {
  consts: ConstDto;
  isConstsLoading: boolean;

  setConsts: (consts: ConstDto) => void;
  setIsConstsLoading: (isConstsLoading: boolean) => void;
  getConsts: () => void;
};
