import { useEditProfile } from "@/entities/user/model/useEditProfile";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import type { EditProfileState } from "@/features/admin-tab-profile-item/schemas/EditProfile";
import type { ProfileItemProps } from "@/shared/api/schemas/userProfileSchema";

import { useState } from "react";

export const AdminProfileTabItem = (props:ProfileItemProps) => {
    const {id, firstname, lastname, bio, avatar, city, workplace } = props

    const {mutate: editProfile} = useEditProfile()
    const { profile } = useFetchProfile();


  const [editState, setEditState] = useState<EditProfileState>({
    isEditing: false,
    values: {},
  });

  const edit = () => {
    setEditState({
      isEditing: true,
      values: { firstname, lastname, bio, avatar, city, workplace }
    })
  }

  const handleInput = (field: keyof EditProfileState["values"], value: string) => {
      setEditState((prev) => ({
        ...prev,
        values: {...prev.values, [field]: value}
      }))
    }

  if (editState.isEditing === true) 
    return <div>
      <div
        className="profileTab"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <input value={editState.values.firstname} onChange={(e) => handleInput("firstname", e.currentTarget.value)}></input>
        <input value={editState.values.lastname} onChange={(e) => handleInput("lastname", e.currentTarget.value)}></input>
        <input value={editState.values.bio} onChange={(e) => handleInput("bio", e.currentTarget.value)}></input>
        <input value={editState.values.avatar} onChange={(e) => handleInput("avatar", e.currentTarget.value)}></input>
        <input value={editState.values.city} onChange={(e) => handleInput("city", e.currentTarget.value)}>
          
        </input>
        <input value={editState.values.workplace} onChange={(e) => handleInput("workplace", e.currentTarget.value)}>
          
        </input>
      </div>
      <div>
        <button onClick={() => {
          editProfile({id, ...editState.values})
          setEditState({isEditing: false, values: {}})}}>✅</button>
        <button>❌</button>
      </div>
    </div>

  if (editState.isEditing === false) 
    return <div>
    <div
      className="profileTab"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
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
    <div >
          <button onClick={() => edit()}>
            [Редактировать]
          </button>
          <button>
            [Удалить]
          </button>
    </div>
  </div>
};
