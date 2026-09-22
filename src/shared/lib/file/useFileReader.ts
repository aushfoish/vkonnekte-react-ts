import { imageCompression } from "@/shared/api/compressImage";

export const handleFileReader = (
  e: React.ChangeEvent<HTMLInputElement>,
  extesnion: string,
  width: number,
  height: number,
): Promise<string | null> => {
  return new Promise((resolve) => {
    const files = e.currentTarget.files;

    const maxSize = 2 * 1024 * 1024;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > maxSize) {
        e.currentTarget.value = "";
        resolve(null);
      } else {
        const reader = new FileReader();
        reader.onload = async () => {
          if (typeof reader.result === "string") {
            try {
              const picToCompress = reader.result;
              const result = await imageCompression(
                picToCompress,
                extesnion,
                width,
                height,
              );
              resolve(result);
            } catch (error) {
              console.error(
                "Ошибка при сжатии изображения:",
                error instanceof Error,
              );
              resolve(null);
            }
          } else {
            resolve(null);
          }
        };

        reader.onerror = () => {
          console.error('Ошибка при чтении файла:',
            reader.error instanceof Error ? reader.error.message : 'не удалось прочитать файл'
          )
        }
        reader.readAsDataURL(file);
      }
    }
  });
};
