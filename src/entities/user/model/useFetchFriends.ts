import { useQuery } from "@tanstack/react-query";
import { supabaseFetch } from "@/shared/api";
import {
  FriendlistSchema,
} from "@/shared/api/schemas/friendItemSchema";
import {

  type Profiles,
} from "@/shared/api/schemas/userProfileSchema";

export const useFetchFriends = (userId: string | undefined) => {
  return useQuery<Profiles>({
    queryKey: ["friendships", userId],
    queryFn: async () => {
      const friendsRes = await supabaseFetch(
        `/rest/v1/friendships?user_id=eq.${userId}`,
        {},
      );

      const friendshipsData = FriendlistSchema.parse(await friendsRes.json());
      const friends = friendshipsData;

      const readyFriendlist = await Promise.all(
        friends.map(async (friend) => {
          const friendItem = await supabaseFetch(
            `/rest/v1/users?user_id=eq.${friend.friend_id}`,
            {},
          );
          if (!friendItem.ok)
            throw new Error("не удалось загрузить данные о друзьях");
          const friendsData = (await friendItem.json());
          return friendsData[0];
        }),
      );
      console.log(readyFriendlist)
      return readyFriendlist;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
