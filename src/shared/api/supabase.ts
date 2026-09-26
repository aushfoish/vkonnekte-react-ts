const API_URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const supabaseFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const refreshToken = async () => {
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
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("access_token", data.access_token);
        console.log("токен обновлён");
        return true;
      }
      if (!response.ok) {
        console.log(`'ошибка обновления токена:' ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

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
          
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");
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
