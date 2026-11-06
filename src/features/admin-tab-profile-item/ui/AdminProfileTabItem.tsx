import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useEditProfile } from "@/entities/user/model/useEditProfile";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import type { EditProfileState } from "@/features/admin-tab-profile-item/schemas/EditProfile";
import type { ProfileItemProps } from "@/shared/api/schemas/userProfileSchema";
import styles from "./AdminProfileTabItem.module.scss";
import { useState } from "react";
import { AdminProfileView } from "@/widgets/admin-profile-view/ui/AdminProfileView";
import { AdminProfileEdit } from "./AdminProfileEdit";

export const AdminProfileTabItem = (props: ProfileItemProps) => {
  const { id, user_id, firstname, ...editableFields } = props;
  const userId = useAuthStore((state) => state.currentUserId) || undefined;

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
        <AdminProfileEdit editState={editState} handleInput={handleInput}/>
        <div>
          <button
            onClick={() => {
              editProfile({ id, ...editState.values });
              setEditState({ isEditing: false, values: {} });
            }}
          >
            ✅
          </button>
          <button
            onClick={() => setEditState({ isEditing: false, values: {} })}
          >
            ❌
          </button>
        </div>
      </div>
    );

  if (editState.isEditing === false)
    return (
      <div>
        <div
          className={styles.profileTab}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {profile && <AdminProfileView profile={profile} />}
        </div>
        <div>
          <button onClick={() => edit()}>[Редактировать]</button>
          <button>[Удалить]</button>
        </div>
      </div>
    );
};
