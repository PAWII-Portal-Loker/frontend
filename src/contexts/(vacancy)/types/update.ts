import { IncomeTypeEnums } from "@/contexts/enums/types/incomeTypes";
import { JobTypeEnums } from "@/contexts/enums/types/jobTypes";
import { VacancyDto } from ".";

export type UpdateVacancyDto = {
  job_type: JobTypeEnums;
  income_type: IncomeTypeEnums;
  position: VacancyDto["position"];
  thumbnail_url: VacancyDto["thumbnail_url"];
  description: VacancyDto["description"];
};
