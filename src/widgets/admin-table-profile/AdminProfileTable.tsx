import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import { AdminProfileTabItem } from "@/features/admin-tab-profile-item/ui/AdminProfileTabItem"

export const AdminProfileTable = () => {

    const userId = useAuthStore((state) => state.currentUserId)

    const { profile } = useFetchProfile(userId);
    
    if (profile)
    return (
        <AdminProfileTabItem user_id={profile.user_id} birthday={profile.birthday} languages={profile.languages} contacts={profile.contacts} personal={profile.personal} id={profile.id} firstname={profile?.firstname} lastname={profile.lastname} bio={profile.bio} avatar={profile.avatar} city={profile.city} workplace={profile.workplace}/>
    )
}