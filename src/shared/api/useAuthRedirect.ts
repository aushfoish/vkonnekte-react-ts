import { useAuthStore } from "@/entities/user/model/useAuthStore"
import { useNavigate } from "react-router-dom"

export const useAuthRedirect = () => {
    const nav = useNavigate()
    const userIsLogged = useAuthStore.getState().userIsLogged
    const currentUserId = useAuthStore.getState().currentUserId

    if (!userIsLogged) {
        nav('auth')
    }
    
    if (userIsLogged) {
        nav(`profile/${currentUserId}`)
    }
}