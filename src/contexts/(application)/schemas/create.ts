import { CreateApplicationFormDto } from "@application/types/create";
import * as Yup from "yup";

export const CreateApplicationSchema:Yup.ObjectSchema<CreateApplicationFormDto> = Yup.object({
  document_urls: Yup.mixed<FileList>() 
    .test(
      "is-valid-filelist", 
      "Document must be a FileList with at least one file",
      (value) => {
        return (
          value instanceof FileList &&
          value.length > 0 && 
          Array.from(value).every(file => file instanceof File)
        );
      }
    )
    .required("Document is required"),
  message: Yup.string()
    .required("Message is required")
    .min(3, "Message must be at least 3 characters"),
})
  .noUnknown(true)
  .strict(true);

