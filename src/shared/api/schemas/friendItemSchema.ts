import z from "zod";

export const UserFriendSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  friend_id: z.string(),
  status: z.string(),
  created_at: z.string(),
});

export const FriendlistSchema = z.array(UserFriendSchema)

export type UserFriend = z.infer<typeof UserFriendSchema>
export type UserFriendlist = z.infer<typeof FriendlistSchema>