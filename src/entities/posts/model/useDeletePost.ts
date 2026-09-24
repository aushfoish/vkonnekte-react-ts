import { supabaseFetch } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = () => {
      const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postId: number) => {

      const response = await supabaseFetch(
        `/rest/v1/posts?id=eq.${postId}`,
        {
          method: "DELETE",
          headers: {
            Prefer: "return=representation",
          },
        },
      );
      if (response.ok) console.log("пост удалён:", postId)
      if (!response.ok) throw new Error(`пост не удалился: ${response.status}`);

    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
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
