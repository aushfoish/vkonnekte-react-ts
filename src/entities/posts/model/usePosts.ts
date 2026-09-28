import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import { UserPostsSchema, type UserPosts} from "@/shared/api/schemas/userPostSchema";

export const useFetchPosts = () => {
  return useQuery<UserPosts>({
    queryKey: ["posts"],
    queryFn: async () => {
      const postsRes = await supabaseFetch("/rest/v1/posts?order=date.desc", {
      });
      if (!postsRes.ok) throw new Error("Не удалось загрузить данные");

      const postsData = UserPostsSchema.parse(await postsRes.json());
      return postsData
    },
    staleTime: 5 * 60 * 1000,
  });
};
