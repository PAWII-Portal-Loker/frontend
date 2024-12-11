import { CompanyDto } from "@/contexts/(company)/types";
import { IncomeTypeEnums } from "@/contexts/enums/types/incomeTypes";
import { JobTypeEnums } from "@/contexts/enums/types/jobTypes";

export interface VacancyDto {
  id: string;
  company: CompanyDto;
  job_type: JobTypeEnums;
  income_type: IncomeTypeEnums;
  position: string;
  thumbnail_url: string;
  description: string;
  applied_count: number;
  is_closed: boolean;
  created_at: Date;
  updated_at: Date;
}
