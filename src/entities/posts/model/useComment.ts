import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import { type UserPosts} from "@/shared/api/schemas/userPostSchema";


export const useFetchComments = (postId: string | null) => {
  return useQuery<UserPosts>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const commsRes = await supabaseFetch(`/rest/v1/comments?post_id=eq.${postId}&order=date.desc&select=*,author:users!author_id(firstname, lastname, avatar)`, { // команда для постгрес, которая вытягивает метаданные автора по author_id, в скобочках пишем только то что нужно получить для отображения постов
      });
      if (!commsRes?.ok) throw new Error("Не удалось загрузить данные");

      const postsData = (await commsRes.json());
      return postsData
    },
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};
