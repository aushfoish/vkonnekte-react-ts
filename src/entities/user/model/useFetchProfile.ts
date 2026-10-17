// import type { Friend } from "@/entities/user/model/useFetchPage";
import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import { ProfilesSchema } from "@/shared/api/schemas/userProfileSchema";



export const useFetchProfile = (userId: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["profileOwner", userId],
    queryFn: async () => {
      const [profileRes] = await Promise.all([ // если чё здесь надо в квадратные скобочки вернуть friendsData и onlineFrData
        supabaseFetch(`/rest/v1/users?user_id=eq.${userId}`, {
          method: "GET",

        }),
        // supabaseFetch(
        //   "/rest/v1/rpc/get_all_friends_widget",
        //   {
        //     method: "GET",

        //   },
        // ),
        // supabaseFetch(
        //   "/rest/v1/rpc/get_online_friends_widget",
        //   {
        //     method: "GET",

        //   },
        // ),
      ]);
      if (!profileRes.ok) {
        throw new Error("Произошла чудовищная ошибка!!!")
      }
      // if (!profileRes.ok || !friendsRes.ok || !onlineRes.ok) {
      //   throw new Error("Произошла чудовищная ошибка!!!")
      // }

      const profileData = ProfilesSchema.parse(await profileRes.json())
      // const friendsData = await friendsRes.json()
      // const onlineFrData = await onlineRes.json()

      return {
        profile: profileData[0],
        // friendsCount: friendsData.totalCount as number,
        // friendsArray: (friendsData.friends || []) as Friend[],
        // friendsOnlineCount: onlineFrData.totalCount as number,
        // friendsOnlineArray: (onlineFrData.friends || []) as Friend[],
      }
    },
    enabled: !!userId,
    staleTime: 3 * 60 * 1000
  });
  return {
    profile: data?.profile || null,
    // friendsCount: data?.friendsCount || 0,
    // friendsArray: data?.friendsArray || [],
    // friendsOnlineCount: data?.friendsOnlineCount || 0,
    isLoading,
    isFetchPositive: !isError,
    refetch
  }
};
