import { useEffect } from "react"
import { useAuthStore } from "./useAuthStore"

export const CheckAuth = () => {
    useEffect(() => {
        const authCheck = useAuthStore.getState().adminAuthCheck
        
        authCheck()
    }, [])
}
