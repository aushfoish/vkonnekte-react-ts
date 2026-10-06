import z from "zod";

export const MusicItemSchema = z.object({
  id: z.number(),
  band: z.string(),
  title: z.string(),
  src: z.string(),
})

export const MusicItemsSchema = z.array(MusicItemSchema)

export type MusicItem = z.infer<typeof MusicItemSchema>

export const FullMusicItemSchema = MusicItemSchema.extend({
  duration: z.string(),
})

export type FullMusicItemSchema = z.infer<typeof FullMusicItemSchema>

export type Playlist = z.infer<typeof MusicItemsSchema>