import { useFetchProfile } from "@/entities/user/model/useFetchProfile"

export const AdminProfileTable = () => {

    const {profile} = useFetchProfile()

    return (
        <div className="profileTab" style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            <div>{profile?.firstname}</div>
            <div>{profile?.lastname}</div>
            <div>{profile?.avatar}</div>
            <div>{profile?.bio}</div>
            <div>{profile?.city}</div>
            <div>{profile?.workplace}</div>
            <div>{profile?.birthday.day}</div>
            <div>{profile?.birthday.year}</div>
            <div>{profile?.birthday.month}</div>
        </div>
    )
}