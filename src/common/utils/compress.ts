import { toaster } from "@ui/toaster";
import imageCompression from "browser-image-compression";
import { PDFDocument } from "pdf-lib";

export const compressImage = (
  file: File,
  callback: (compressedFile: File) => void
) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  imageCompression(file, options)
    .then((compressedFile) => {
      const compressedImageFile = new File([compressedFile], file.name, {
        type: file.type,
      });

      if (compressedImageFile.size < file.size) {
        callback(compressedImageFile);
      } else {
        callback(file);
      }
    })
    .catch((error: unknown) => {
      toaster.error({
        title: "Error compressing image",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while compressing the image",
      });
      callback(file);
    });
};

export const compressPdf = async (
  file: File,
  callback: (compressedFile: File) => void
) => {
  try {
    const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
    const optimizedPdf = await pdfDoc.save({
      updateFieldAppearances: false,
    });
    const compressedFile = new File([optimizedPdf], file.name, {
      type: "application/pdf",
    });

    if (compressedFile.size < file.size) {
      callback(compressedFile);
    } else {
      callback(file);
    }
  } catch (error: unknown) {
    toaster.error({
      title: "Error compressing PDF",
      description:
        error instanceof Error
          ? error.message
          : "An error occurred while compressing the PDF",
    });
    callback(file);
  }
};
