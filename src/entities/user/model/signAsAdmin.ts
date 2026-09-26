const API_URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY; 

export const signAsAdmin = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'apikey': API_KEY
        },
        body: JSON.stringify({email, password})
    })

    if (!response.ok) throw new Error("Ошибка авторизации")

        const data = await response.json()
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        
        return data
}