import * as Yup from "yup";

export const UpdateVacancyStatusSchema = Yup.object({
  is_closed: Yup.boolean().required("Status is required"),
})
  .noUnknown(true)
  .strict(true);
