import { JobTypeEnums } from "@enums/types/jobTypes";
import { VacancyDto } from ".";
import { IncomeTypeEnums } from "@enums/types/incomeTypes";

export type CreateVacancyDto = {
  job_type: JobTypeEnums;
  income_type: IncomeTypeEnums;
  position: VacancyDto["position"];
  thumbnail_url: VacancyDto["thumbnail_url"];
  description: VacancyDto["description"];
};
