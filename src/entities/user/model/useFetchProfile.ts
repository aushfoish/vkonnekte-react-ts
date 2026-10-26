// import type { Friend } from "@/entities/user/model/useFetchPage";
import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import { ProfilesSchema } from "@/shared/api/schemas/userProfileSchema";



export const useFetchProfile = (userId: string | undefined) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["profileOwner", userId],
    queryFn: async () => {
      const [profileRes] = await Promise.all([ // если чё здесь надо в квадратные скобочки вернуть friendsData и onlineFrData
        supabaseFetch(`/rest/v1/users?user_id=eq.${userId}`, {
          method: "GET",
        }),
      ]);
      if (!profileRes.ok) {
        throw new Error("Произошла чудовищная ошибка!!!")
      }

      const profileData = ProfilesSchema.parse(await profileRes.json())
      return {
        profile: profileData[0],
      }
    },
    enabled: !!userId,
    staleTime: 3 * 60 * 1000
  });
  return {
    profile: data?.profile || null,
    isLoading,
    isFetchPositive: !isError,
    refetch
  }
};
