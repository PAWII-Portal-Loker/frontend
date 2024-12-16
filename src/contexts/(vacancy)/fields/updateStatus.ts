import { UpdateVacancyStatusDto } from "../types/updateStatus";
import { UpdateVacancyStatusSchema } from "../schemas/updateStatus";
import { FieldConfig } from "@types";

export const UpdateVacancyStatusField: FieldConfig<UpdateVacancyStatusDto>[] = [
  {
    name: "is_closed",
    label: "Status",
    type: "checkbox",
    placeholder: "Select status",
    rules: UpdateVacancyStatusSchema.fields.is_closed,
  },
];
