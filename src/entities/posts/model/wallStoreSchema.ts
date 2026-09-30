import z from "zod";


export const WallStoreSchema = z.object({
  isLoading: z.boolean(),
  isSending: z.boolean(),
  isPostSend: z.boolean(),
  contentText: z.string(),
  contentPicture: z.string(),
  postIsEmpty: z.boolean(),
  isTyping: z.boolean(),
  inputPost: z.string(),
});

export type wallStore = z.infer<typeof WallStoreSchema>;

export interface wallStoreProps extends wallStore {
  sendPost: () => Promise<boolean>;
  setInputPost: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetSendStatus: () => void;
}
