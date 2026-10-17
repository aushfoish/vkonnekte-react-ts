import { useEditProfile } from "@/entities/user/model/useEditProfile";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import type { EditProfileState } from "@/features/admin-tab-profile-item/schemas/EditProfile";
import type { ProfileItemProps } from "@/shared/api/schemas/userProfileSchema";

import { useState } from "react";

export const AdminProfileTabItem = (props: ProfileItemProps) => {
  const { id, user_id, firstname, ...editableFields } = props;

  const { mutate: editProfile } = useEditProfile();
  const userId = "c849ba0e-1a02-4d1b-8042-01d801e3c7b1";

  const { profile } = useFetchProfile(userId);

  const [editState, setEditState] = useState<EditProfileState>({
    isEditing: false,
    values: {},
  });

  const edit = () => {
    setEditState({
      isEditing: true,
      values: { id, user_id, firstname, ...editableFields },
    });
  };

  const handleInput = (
    field: keyof EditProfileState["values"],
    value: string,
  ) => {
    setEditState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
    }));
  };

  if (editState.isEditing === true)
    return (
      <div>
        <div
          className="profileTab"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <input
            value={editState.values.firstname}
            onChange={(e) => handleInput("firstname", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.lastname}
            onChange={(e) => handleInput("lastname", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.bio}
            onChange={(e) => handleInput("bio", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.avatar}
            onChange={(e) => handleInput("avatar", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.city}
            onChange={(e) => handleInput("city", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.workplace}
            onChange={(e) => handleInput("workplace", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.languages}
            onChange={(e) => handleInput("languages", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.personal?.activity}
            onChange={(e) => handleInput("personal", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.personal?.hobbies}
            onChange={(e) => handleInput("personal", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.personal?.movies}
            onChange={(e) => handleInput("personal", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.personal?.music}
            onChange={(e) => handleInput("personal", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.personal?.quotes}
            onChange={(e) => handleInput("personal", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.contacts?.city}
            onChange={(e) => handleInput("contacts", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.contacts?.mobile}
            onChange={(e) => handleInput("contacts", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.contacts?.github}
            onChange={(e) => handleInput("contacts", e.currentTarget.value)}
          ></input>
          <input
            value={editState.values.contacts?.telegram}
            onChange={(e) => handleInput("contacts", e.currentTarget.value)}
          ></input>
          
        </div>
        <div>
          <button
            onClick={() => {
              editProfile({ id, ...editState.values });
              setEditState({ isEditing: false, values: {} });
            }}
          >
            ✅
          </button>
          <button>❌</button>
        </div>
      </div>
    );

  if (editState.isEditing === false)
    return (
      <div>
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
          <div>{profile?.birthday}</div>
          <div>{profile?.city}</div>
          <div>{profile?.languages}</div>
          <div>{profile?.workplace}</div>
          <div>{profile?.contacts.city}</div>
          <div>{profile?.contacts.mobile}</div>
          <div>{profile?.contacts.github}</div>          
          <div>{profile?.contacts.telegram}</div>
          <div>{profile?.personal.activity}</div>
          <div>{profile?.personal.hobbies}</div>
          <div>{profile?.personal.music}</div>
          <div>{profile?.personal.movies}</div>
          <div>{profile?.personal.quotes}</div>
        </div>
        <div>
          <button onClick={() => edit()}>[Редактировать]</button>
          <button>[Удалить]</button>
        </div>
      </div>
    );
};
