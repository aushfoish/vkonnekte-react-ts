import z from "zod";

export const PostToSendSchema = z.object({
  content: z.string(),
  username: z.string(),
  userPictureSrc: z.string(),
  imageContentSrc: z.string(),
  author_id: z.string().nullable(),
  wall_id: z.string()
});

export type postToSend = z.infer<typeof PostToSendSchema>;
