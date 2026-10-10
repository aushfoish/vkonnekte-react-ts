import { supabaseFetch } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trackId: number) => {
      const response = await supabaseFetch(`/rest/v1/tracks?id=eq.${trackId}`, {
        method: "DELETE",
        headers: {
          Prefer: "return=representation",
        },
      });
      if (response.ok) console.log("трек удалён:", trackId);
      if (!response.ok) throw new Error(`трек не удалился: ${response.status}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
    },
    onError: (error) => {
      console.error(
        error instanceof Error ? error.message : "Неизвестная ошибка",
        error,
      );
    },
  });
};
