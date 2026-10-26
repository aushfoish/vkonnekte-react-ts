import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import { UserPostsSchema, type UserPosts} from "@/shared/api/schemas/userPostSchema";

export const useFetchPosts = (userId: string | undefined) => {
  return useQuery<UserPosts>({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const postsRes = await supabaseFetch(`/rest/v1/posts?wall_id=eq.${userId}&order=date.desc`, {
      });
      if (!postsRes.ok) throw new Error("Не удалось загрузить данные");

      const postsData = UserPostsSchema.parse(await postsRes.json());
      return postsData
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
