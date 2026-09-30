import z from "zod";

export const MusicItemSchema = z.object({
  id: z.string(),
  band: z.string(),
  title: z.string(),
  src: z.string(),
})

export const MusicItemsSchema = z.array(MusicItemSchema)

export type MusicItem = z.infer<typeof MusicItemSchema>

export interface MusicItemProps extends MusicItem {
      duration: string,
} 

export type Playlist = z.infer<typeof MusicItemsSchema>