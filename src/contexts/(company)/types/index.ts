import { UserDto } from "@/contexts/user/types";

export interface CompanyDto {
  id: string;
  user: UserDto;
  company_type: string;
  company_name: string;
  founding_date: Date;
  employee_total: number;
  early_working_hour: string;
  end_working_hour: string;
  created_at: Date;
  updated_at: Date;
}
