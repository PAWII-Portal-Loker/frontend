export type IncomeTypeEnums = string;

export const INCOME_TYPE_PAID: IncomeTypeEnums = "Paid";
export const INCOME_TYPE_UNPAID: IncomeTypeEnums = "Unpaid";
export const INCOME_TYPE_CONDITIONAL_PAID: IncomeTypeEnums = "Conditional Paid";
export const INCOME_TYPE_OTHER: IncomeTypeEnums = "Other";

export const INCOME_TYPES = [
  INCOME_TYPE_PAID,
  INCOME_TYPE_UNPAID,
  INCOME_TYPE_CONDITIONAL_PAID,
  INCOME_TYPE_OTHER,
];

export type IncomeTypeDto = string;

export type IncomeTypeStoreState = {
  incomeTypes: IncomeTypeDto[];
  isIncomeTypesLoading: boolean;

  setIncomeTypes: (incomeTypes: IncomeTypeDto[]) => void;
  setIsIncomeTypesLoading: (isIncomeTypesLoading: boolean) => void;
  getIncomeTypes: () => void;
};
