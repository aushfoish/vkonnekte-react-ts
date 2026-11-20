import { compressUserpic } from "@/shared/api/compressUserpic";
import { resize } from "@/shared/lib/file/useResize";

export const handleFileReaderAvatar = (
  e: React.ChangeEvent<HTMLInputElement>,
): Promise<string | null> => {
  return new Promise((resolve) => {
    const files = e.currentTarget.files;

    const maxSize = 2 * 1024 * 1024; // максимальный размер файла в байтах

    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > maxSize) {
        e.currentTarget.value = "";
        resolve(null);
      } else {
        const readyBlob = async () => {
          const bitmap = await createImageBitmap(file)
          const minBlob = resize(bitmap.width, bitmap.height, 50)
          const midBlob = resize(bitmap.width, bitmap.height, 300)
          // const maxBlob = bitmap 

          const [minUrl, midUrl] = await Promise.all([
            compressUserpic(bitmap, 'jpg/png', minBlob.canvasWidth, minBlob.cavnasHeight),
            compressUserpic(bitmap, 'jpg/png', midBlob.canvasWidth, midBlob.cavnasHeight)
          ])
          
          return {
            avatar_min: minUrl,
            avatar_mid: midUrl
          }
          
        }

        readyBlob()
        

        
      }
    }
  });
};
