import { prepareBlobData } from "@/shared/lib/file/prepareBlobData";
import { supabaseFetch } from "./supabase";

export const uploadPicture = async (
  blob: Blob | null,
  bucket: string,
  extension: string,
): Promise<string | null> => {
  if (!blob) return null

    try {
      const { blobUrl, mime } = prepareBlobData(extension, bucket);
      const response = await supabaseFetch(blobUrl, {
        method: "POST",
        headers: {
          "Content-Type": mime,
        },
        body: blob,
      });
      if (!response.ok) {
        throw new Error(`Ошибка загрузки изображения: ${response.status}`);
      }
      
      return blobUrl
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.log(error)
      }
      return null;
    }
};
