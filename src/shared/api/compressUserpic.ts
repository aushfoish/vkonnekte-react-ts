import { uploadPicture } from "./uploadPicture";

export const compressUserpic = (
  picToCompress: ImageBitmap,
  extesnion: string,
  width: number,
  height: number,
): Promise<string | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    if (!canvas) return;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      canvas.width = width;
      canvas.height = height;
      img.onload = () => {
        ctx?.drawImage(picToCompress, 0, 0, width, height);
        const imageExt = extesnion; //"jpg", "png"
        const bucket =
          "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/pictures";
        canvas.toBlob(
          async (readyBlob) => {
            const blobUrl = await uploadPicture(readyBlob, bucket, imageExt);
            console.log(blobUrl)
            resolve(blobUrl);
          },
          "image/jpeg",
          0.8,
        );
      };
    }
  });
};
