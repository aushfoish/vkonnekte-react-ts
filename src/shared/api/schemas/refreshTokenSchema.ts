import z from "zod";

export const RefreshTokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

export type RefreshTokenResponse = z.infer<typeof RefreshTokenSchema>;