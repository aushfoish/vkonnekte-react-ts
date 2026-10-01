import { deleteToken } from "@/shared/api/deleteToken";
import { refreshToken } from "@/shared/api/refreshToken";

const API_URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const supabaseFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {

  const cleanUrl = endpoint.startsWith("http")
    ? endpoint
    : `${API_URL}/${endpoint.replace(/^\//, "")}`;

  let token = localStorage.getItem("access_token") ?? API_KEY;

  const dataFetch = async (isRetry = false) => {
    const headers = {
      "Content-Type": "application/json",
      apikey: API_KEY,
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(cleanUrl, {
        ...options,
        headers,
      });
      if (response.status === 401) {
        if (isRetry) return response
        const res = await refreshToken();
        if (res === false) {
            deleteToken()
            token = API_KEY;
            return await dataFetch(true)
          
        }
        if (res === true) {
          token = localStorage.getItem("access_token");
          return await dataFetch(true);
        }
      }
      if (!response.ok)
        throw new Error("неизвестная ошибка при получении данных");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return await dataFetch();
};