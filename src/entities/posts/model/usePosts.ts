import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import type { UserPosts } from "@/entities/posts/model/types";

export const useFetchPosts = () => {
  return useQuery<UserPosts[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const postsRes = await supabaseFetch("/rest/v1/posts?order=date.desc", {
      });
      if (!postsRes.ok) throw new Error("Не удалось загрузить данные");

      const postsData = await postsRes.json();
      return Array.isArray(postsData) ? postsData : [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
