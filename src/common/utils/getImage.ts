import FileUploadService from "@fileUpload/service";
import { isValidImageUrl } from "./validImageUrl";

export async function getServerImage(imgId: string) {
  if (isValidImageUrl(imgId)) {
    return imgId;
  } else {
    const fileService = new FileUploadService();

    try {
      return await fileService.getFile(imgId, {
        onSuccess: (res) => res.url,
        onError: () => "/no-image.jpg",
      });
    } catch {
      return "/no-image.jpg";
    }
  }
}
