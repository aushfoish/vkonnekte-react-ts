import { formatTime } from "@/entities/mp3-player/lib/formatTime";
import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import { FullMusicItemSchema, MusicItemsSchema } from "@/shared/api/schemas/musicItemSchema";


export const useFetchMusic = () => {
  return useQuery<FullMusicItemSchema[]>({
    queryKey: ["tracks"],
    queryFn: async () => {
      const playlistRes = await supabaseFetch(
        "https://tyekwqioulapfagzpswr.supabase.co/rest/v1/tracks", {
      });
      if (!playlistRes.ok) {
        throw new Error("Произошла чудовищная ошибка!!!");
      }

      const playlistData = MusicItemsSchema.parse(await playlistRes.json());
      const tracks = playlistData

      const fullList = await Promise.all(
        tracks.map(async (track) => {
          const totalSeconds = await new Promise<number>((resolve) => {
            const audio = new Audio();
            audio.src = track.src;
            audio.preload = "metadata";

            audio.onloadeddata = () => {
              resolve(audio.duration || 0);
            };

            audio.onerror = () => {
              console.error(
                `не удалось загрузить метаданные трека: ${track.title}`,
              );
              resolve(0);
            };
          });
          return {
            ...track,
            duration: formatTime(totalSeconds),
          };
        }),
      );
      return fullList
    },

    staleTime: 10 * 60 * 1000,
  });
};
