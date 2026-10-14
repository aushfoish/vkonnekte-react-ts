import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import { AdminProfileTabItem } from "@/features/admin-tab-profile-item/ui/AdminProfileTabItem"

export const AdminProfileTable = () => {

        const { profile } = useFetchProfile();
    
    if (profile)
    return (
        <AdminProfileTabItem id={profile.id} firstname={profile?.firstname} lastname={profile.lastname} bio={profile.bio} avatar={profile.avatar} city={profile.city} workplace={profile.workplace}/>
    )
}