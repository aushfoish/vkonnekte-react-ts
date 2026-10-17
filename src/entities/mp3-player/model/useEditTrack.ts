import { supabaseFetch } from "@/shared/api";
import { MusicItemsSchema, type MusicItem } from "@/shared/api/schemas/musicItemSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTrack = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<MusicItem> & {id: number}) => {
      const updatedTrack = {
        band: payload.band,
        title: payload.title,
        src: payload.src
      };

      const response = await supabaseFetch(`/rest/v1/tracks?id=eq.${payload.id}`, {
        method: "PATCH",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify(updatedTrack),
      });

      if (!response.ok)
        throw new Error(`Ошибка при редактировании аудио: ${response.status}`);

      const editedTracks = MusicItemsSchema.parse(await response.json())
      return editedTracks;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
    },

    onError: (error) => {
      console.error(
        error instanceof Error
          ? error.message
          : "Неизвестная ошибка при редактировании аудио",
        error,
      );
    },
  });
};
