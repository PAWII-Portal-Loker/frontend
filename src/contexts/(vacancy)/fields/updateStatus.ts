import FieldConfig from "@/common/types/fieldConfig";
import { UpdateVacancyStatusDto } from "../types/updateStatus";
import { UpdateVacancyStatusSchema } from "../schemas/updateStatus";

export const UpdateVacancyStatusField: FieldConfig<UpdateVacancyStatusDto>[] = [
  {
    name: "is_closed",
    label: "Status",
    type: "checkbox",
    placeholder: "Select status",
    rules: UpdateVacancyStatusSchema.fields.is_closed,
  },
];
