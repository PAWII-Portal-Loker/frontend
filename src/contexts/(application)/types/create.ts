import { VacancyDto } from "@vacancy/types";
import { ApplicationDto } from ".";

export interface CreateApplicationDto {
  vacancy_id: VacancyDto["id"];
  document_urls?: ApplicationDto["document_urls"];
  message: ApplicationDto["message"];
}

export interface CreateApplicationFormDto {
  document_urls: FileList;
  message: ApplicationDto["message"];
}
