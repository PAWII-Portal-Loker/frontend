import { FilterType } from "@types";

export interface VacancyFilter extends FilterType {
  ownedByMe: boolean;
  ownedBy: string;
  position: string;
  jobType: string;
  incomeType: string;
  isClosed: boolean;
}
