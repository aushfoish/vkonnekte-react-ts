import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useEditProfile } from "@/entities/user/model/useEditProfile";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import type { EditProfileState } from "@/features/admin-tab-profile-item/schemas/EditProfile";
import type { ProfileItemProps } from "@/shared/api/schemas/userProfileSchema";

import { useState } from "react";

export const AdminProfileTabItem = (props: ProfileItemProps) => {
  const { id, user_id, firstname, ...editableFields } = props;
  const userId = useAuthStore((state) => state.currentUserId)

  const { mutate: editProfile } = useEditProfile();

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
          <textarea rows={2}
            value={editState.values.firstname}
            onChange={(e) => handleInput("firstname", e.currentTarget.value)}
          ></textarea>
          <textarea rows={2}
            value={editState.values.lastname}
            onChange={(e) => handleInput("lastname", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.bio ?? ""}
            onChange={(e) => handleInput("bio", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.avatar ?? ""}
            onChange={(e) => handleInput("avatar", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.birthday ?? ""}
            onChange={(e) => handleInput("birthday", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.city ?? ""}
            onChange={(e) => handleInput("city", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.workplace ?? ""}
            onChange={(e) => handleInput("workplace", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.languages ?? ""}
            onChange={(e) => handleInput("languages", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.country ?? ""}
            onChange={(e) => handleInput("country", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.phone_number ?? ""}
            onChange={(e) => handleInput("phone_number", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.website ?? ""}
            onChange={(e) => handleInput("website", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.activities ?? ""}
            onChange={(e) => handleInput("activities", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.hobbies ?? ""}
            onChange={(e) => handleInput("hobbies", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.music_genres ?? ""}
            onChange={(e) => handleInput("music_genres", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.favorite_movies ?? ""}
            onChange={(e) => handleInput("favorite_movies", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.favorite_games ?? ""}
            onChange={(e) => handleInput("favorite_games", e.currentTarget.value)}
          ></textarea>
          <textarea
            value={editState.values.favorite_quotes ?? ""}
            onChange={(e) => handleInput("favorite_quotes", e.currentTarget.value)}
          ></textarea>
          <textarea rows={4}
            value={editState.values.about_me ?? ""}
            onChange={(e) => handleInput("about_me", e.currentTarget.value)}
          ></textarea>
          
          
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
          <div>{profile?.country}</div>
          <div>{profile?.phone_number}</div>
          <div>{profile?.website}</div>
          <div>{profile?.activities}</div>
          <div>{profile?.hobbies}</div>
          <div>{profile?.music_genres}</div>
          <div>{profile?.favorite_movies}</div>
          <div>{profile?.favorite_games}</div>
          <div>{profile?.favorite_quotes}</div>
          <div>{profile?.about_me}</div>
          
        </div>
        <div>
          <button onClick={() => edit()}>[Редактировать]</button>
          <button>[Удалить]</button>
        </div>
      </div>
    );
};
