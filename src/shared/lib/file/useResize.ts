import { uploadPicture } from "@/shared/api/uploadPicture";

export const resize = (
  blob: ImageBitmap,
  bitmapWidth: number,
  bitmapHeight: number,
  maxSide: number,
): Promise<string | null> => {
  return new Promise((resolve) => {
    const scale = Math.min(maxSide / bitmapWidth, maxSide / bitmapHeight, 1);

    const canvasWidth = Math.round(bitmapWidth * scale);
    const cavnasHeight = Math.round(bitmapHeight * scale);

    const canvas = document.createElement("canvas");
    if (!canvas) return;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      canvas.width = canvasWidth;
      canvas.height = cavnasHeight;
      ctx?.drawImage(blob, 0, 0, canvasWidth, cavnasHeight);
      const imageExt = "jpeg"; //"jpg", "png"
      const bucket =
        "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/pictures";
      canvas.toBlob(async (readyBlob) => {
        const blobUrl = await uploadPicture(readyBlob, bucket, imageExt);
        resolve(blobUrl)
      }, 'image/jpeg', 0.8);
    }
  });
};
