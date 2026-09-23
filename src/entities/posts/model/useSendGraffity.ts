import type { UserPosts, PostToSend } from "@/entities/posts/model/types";
import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { supabaseFetch } from "@/shared/api";
import { uploadPicture } from "@/shared/api/uploadPicture";
import { useMutation } from "@tanstack/react-query";

export const useSendGraffity = () => {
  return useMutation({
    mutationFn: async (readyBlob: Blob) => {
      const bucket =
        "https://tyekwqioulapfagzpswr.supabase.co/storage/v1/object/pictures";

      const blobUrl = await uploadPicture(readyBlob, bucket, "png");
      if (!blobUrl) {
        throw new Error("Не удалось загрузить граффити в хранилище");
      }

      const userName = useAuthStore.getState().userName;
      const userPic = useAuthStore.getState().userPic;

      const newPost: PostToSend = {
        content: "",
        username: userName,
        userPictureSrc: userPic,
        imageContentSrc: blobUrl,
      };

      const response = await supabaseFetch(
        "/rest/v1/posts",
        {
          method: "POST",
          headers: { Prefer: "return=representation" },
          body: JSON.stringify(newPost),
        },
      );

      if (!response.ok)
        throw new Error(`Ошибка создания поста: ${response.status}`);

      const createdPosts = (await response.json() as UserPosts)
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
