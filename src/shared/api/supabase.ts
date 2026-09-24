const API_URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY; 

export const supabaseFetch = async (endpoint: string, options: RequestInit = {}) => {

  const token = localStorage.getItem('access_token') ?? API_KEY

  const headers = {
    'Content-Type': 'application/json',
    'apikey': API_KEY,
    'Authorization': `Bearer ${token}`,
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