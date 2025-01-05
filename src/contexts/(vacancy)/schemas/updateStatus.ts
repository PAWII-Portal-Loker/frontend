import { UpdateVacancyStatusDto } from "@vacancy/types/updateStatus";
import * as Yup from "yup";

export const UpdateVacancyStatusSchema: Yup.ObjectSchema<UpdateVacancyStatusDto> =
  Yup.object({
    is_closed: Yup.boolean().required("Status is required"),
  })
    .noUnknown(true)
    .strict(true);
