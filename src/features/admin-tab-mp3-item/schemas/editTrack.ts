import type { MusicItem } from "@/shared/api/schemas/musicItemSchema";


export type Mp3EditState = {
  isEditing: boolean;
  values: Partial<MusicItem>;
};