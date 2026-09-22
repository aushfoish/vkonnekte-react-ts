const API_URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY; 

export const supabaseFetch = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'apikey': API_KEY,
    'Authorization': `Bearer ${API_KEY}`,
    ...options.headers,
  };

  const cleanUrl = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_URL}/${endpoint.replace(/^\//, '')}`;

  return fetch(cleanUrl, {
    ...options,
    headers,
  });
};