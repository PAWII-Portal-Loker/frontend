import { CreateApplicationFormDto } from "@application/types/create";
import * as Yup from "yup";

export const CreateApplicationSchema: Yup.ObjectSchema<CreateApplicationFormDto> =
  Yup.object({
    document_urls: Yup.array()
      .of(Yup.mixed<File>().required())
      .min(1, "Please select at least one file")
      .max(5, "You can only upload up to 5 files")
      .required("Document is required"),
    message: Yup.string()
      .required("Message is required")
      .min(3, "Message must be at least 3 characters")
      .max(500, "Message must be at most 500 characters"),
  })
    .noUnknown(true)
    .strict(true);
