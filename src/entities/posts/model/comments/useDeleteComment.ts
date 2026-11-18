import { supabaseFetch } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commId: number) => {
      const response = await supabaseFetch(`/rest/v1/comments?id=eq.${commId}`, {
        method: "DELETE",
        headers: {
          Prefer: "return=representation",
        },
      });
      if (response?.ok) console.log("комментарий удалён:", commId);
      if (!response?.ok) throw new Error(`пост не удалился: ${response?.status}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      console.error(
        error instanceof Error ? error.message : "Неизвестная ошибка",
        error,
      );
    },
  });
};
