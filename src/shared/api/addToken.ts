import type { RefreshTokenResponse } from "@/shared/api/schemas/refreshTokenSchema";

export const addToken = (data: RefreshTokenResponse) => {
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("access_token", data.access_token);
};
