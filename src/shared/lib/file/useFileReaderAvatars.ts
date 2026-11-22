import { uploadPicture } from "@/shared/api/uploadPicture";
import { resize } from "@/shared/lib/file/useResize";

interface AvatarObject {
  avatar: string | null,
  avatar_mini_50: string | null, 
  avatar_main_page: string | null
}

export const handleFileReaderAvatar = (
  e: React.ChangeEvent<HTMLInputElement>,
): Promise<AvatarObject | null> => {
  return new Promise((resolve) => {
    const files = e.currentTarget.files
    const maxSize = 2 * 1024 * 1024
    if (files && files.length > 0) {
      const file = files[0]
      if (file.size > maxSize) {
        e.currentTarget.value = "";
        resolve(null)
      } else if (file.size > 0 && file.size < maxSize) {
        const bucket =
        "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/pictures"
        const readyBlob = async (blob: File) => {
          const bitmap = await createImageBitmap(blob)
          const [min, mid, max] = await Promise.all([
            resize(bitmap, bitmap.width, bitmap.height, 50),
            resize(bitmap, bitmap.width, bitmap.height, 250),
            uploadPicture(file, bucket, 'jpg')
          ])

          bitmap.close()

          if (!min || !mid || !max) return null
          
          return {
            avatar: max,
            avatar_mini_50: min,
            avatar_main_page: mid
          }

          
        }
        resolve(readyBlob(file))
      }
    }
  });
};
// export const handleFileReaderAvatar = (
//   e: React.ChangeEvent<HTMLInputElement>,
// ): Promise<string | null> => {
//   return new Promise((resolve) => {
//     const files = e.currentTarget.files;

//     const maxSize = 2 * 1024 * 1024; // максимальный размер файла в байтах

//     if (files && files.length > 0) {
//       const file = files[0];

//       if (file.size > maxSize) {
//         e.currentTarget.value = "";
//         resolve(null);
//       } else if (file.size > 0 && file.size < maxSize) {
//         const readyBlob = async () => {
//           const bitmap = await createImageBitmap(file)
//           const minBlob = resize(bitmap.width, bitmap.height, 50)
//           const midBlob = resize(bitmap.width, bitmap.height, 300)
//           // const maxBlob = bitmap 

//           const [minUrl, midUrl] = await Promise.all([
//             compressUserpic(bitmap, 'jpg/png', minBlob.canvasWidth, minBlob.cavnasHeight),
//             compressUserpic(bitmap, 'jpg/png', midBlob.canvasWidth, midBlob.cavnasHeight)
//           ])
          
//           return {
//             avatar_min: minUrl,
//             avatar_mid: midUrl
//           }
          
//         }

//         readyBlob()
        

        
//       }
//     }
//   });
// };
