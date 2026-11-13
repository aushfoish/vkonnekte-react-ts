import { RefreshTokenSchema } from "@/shared/api/schemas/refreshTokenSchema";
import { useAuthStore } from "./useAuthStore";
import { deleteToken } from "@/shared/api/deleteToken";

const API_URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const signAsAdmin = async (email: string, password: string) => {
  try {
    useAuthStore.setState({ isUserLoggining: true, userIsLogged: false });
    const response = await fetch(
      `${API_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          apikey: API_KEY,
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      deleteToken();
      useAuthStore.setState({ isUserLoggining: false, userIsLogged: false });
      throw new Error("Ошибка авторизации");
    }
    if (response.ok) {
      const data = RefreshTokenSchema.parse(await response.json());
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("current_user_id", data.user.id);
      useAuthStore.setState({
        isUserLoggining: false,
        userIsLogged: true,
        currentUserId: data.user.id,
      });
      return data;
    }
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "неизвестная ошибка при авторизации",
      error,
    );
  }
};
