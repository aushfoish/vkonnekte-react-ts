import { addToken } from "@/shared/api/addToken";
import { RefreshTokenSchema } from "@/shared/api/schemas/refreshTokenSchema";

const API_URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const refreshToken = async () => {
    try {
      const response = await fetch(
        `${API_URL}/auth/v1/token?grant_type=refresh_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Prefer: "return=representation",
            apikey: API_KEY,
          },
          body: JSON.stringify({
            refresh_token: localStorage.getItem("refresh_token"),
          }),
        },
      );
      if (!response.ok) {
        console.log(`'ошибка обновления токена:' ${response.status}`);
        return false;
      }
      if (response.ok) {
        const data = RefreshTokenSchema.parse(await response.json());
        addToken(data)
        console.log("токен обновлён");
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };