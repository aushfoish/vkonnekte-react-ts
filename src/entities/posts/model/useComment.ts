import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import { PostsCommentariesSchema, type postsComments } from "@/shared/api/schemas/postCommSchema";


export const useFetchComments = (postId: number | null) => {
  return useQuery<postsComments>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const commsRes = await supabaseFetch(`/rest/v1/comments?post_id=eq.${postId}&order=date.asc&select=*,author:users!author_id(firstname, lastname, avatar)`, { // команда для постгрес, которая вытягивает метаданные автора по author_id, в скобочках пишем только то что нужно получить для отображения постов
      });
      if (!commsRes?.ok) throw new Error("Не удалось загрузить данные");

      const postsData = PostsCommentariesSchema.parse(await commsRes.json());
      return postsData
    },
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};
