import { supabaseFetch } from "@/shared/api";
import { type UserPost } from "@/shared/api/schemas/userPostSchema";
import { useMutation } from "@tanstack/react-query";

export const useEditPost = () => {


  return useMutation({
    mutationFn: async (postId: number) => {


      const updatedPost = {
        postId: postId,
      };

      const response = await supabaseFetch(
        `/rest/v1/posts?id=eq.${postId}`,
        {
          method: "PATCH",
          headers: {
            Prefer: "return=representation",
          },
          body: JSON.stringify(updatedPost),
        },
      );

      if (!response.ok) throw new Error(`Ошибка при редактировании поста: ${response.status}`);

      const createdPosts = await response.json() as UserPost;
      return createdPosts;
    },
    onSuccess: () => {
      
    },
    onError: (error) => {
      console.error(
        error instanceof Error
          ? error.message
          : "Неизвестная ошибка при редактировании поста",
        error,
      );
    },
  });
};
