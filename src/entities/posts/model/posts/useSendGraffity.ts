import { supabaseFetch } from "@/shared/api";
import { PostsSendSchema, type postToSend } from "@/shared/api/schemas/postToSendSchema";
import { uploadPicture } from "@/shared/api/uploadPicture";
import { useMutation } from "@tanstack/react-query";

export const useSendGraffity = () => {
  return useMutation({
    mutationFn: async (payload: {
      readyBlob: Blob,
      wallId: string
    }) => {
      const bucket =
        "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/pictures";

      const blobUrl = await uploadPicture(payload.readyBlob, bucket, "png");
      if (!blobUrl) {
        throw new Error("Не удалось загрузить граффити в хранилище");
      }

      const currentUserId = localStorage.getItem('current_user_id')
      

      const newPost: postToSend = {
        content: "",
        imageContentSrc: blobUrl,
        author_id: currentUserId,
        wall_id: payload.wallId
      };

      const response = await supabaseFetch(
        "/rest/v1/posts",
        {
          method: "POST",
          headers: { Prefer: "return=representation" },
          body: JSON.stringify(newPost),
        },
      );

      if (!response?.ok)
        throw new Error(`Ошибка создания поста: ${response?.status}`);

      const createdPosts = PostsSendSchema.parse(await response.json())
      return createdPosts
    },

    onSuccess: () => {},
    onError: (error) => {
      console.error(
        error instanceof Error
          ? error.message
          : "Неизвестная ошибка",
        error,
      );
    },
  });
};
