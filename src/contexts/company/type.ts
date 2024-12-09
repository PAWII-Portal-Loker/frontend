import { CommonStoreState } from "@/common/types/commonStoreState";
import { defaultUserDto, UserDto } from "../(auth)/type";

export interface CompanyRequestDto {
  company_type: string;
  company_name: string;
  founding_date: Date;
  employee_total: number;
  early_working_hour: string;
  end_working_hour: string;
}

export interface CompanyDto extends CompanyRequestDto {
  id: string;
  user: UserDto;
  created_at: Date;
  updated_at: Date;
}

export const defaultCompanyDto: CompanyDto = {
  id: "",
  user: defaultUserDto,
  company_type: "",
  company_name: "",
  founding_date: new Date(),
  employee_total: 0,
  early_working_hour: "",
  end_working_hour: "",
  created_at: new Date(),
  updated_at: new Date(),
};

export interface CompanyStoreState extends CommonStoreState<CompanyDto> {
  singleData: CompanyDto;

  setSingleData: (data: CompanyDto) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: CompanyRequestDto) => void;
  updateData: (data: CompanyRequestDto) => void;
}
