import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useEditProfile } from "@/entities/user/model/useEditProfile";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import type { EditProfileState } from "@/features/admin-tab-profile-item/schemas/EditProfile";
import type { ProfileItemProps } from "@/shared/api/schemas/userProfileSchema";
import styles from "./AdminProfileTabItem.module.scss";
import { useState } from "react";
import { AdminProfileView } from "@/widgets/admin-profile-view/AdminProfileView";
import { AdminProfileEditItem } from "@/shared/ui/AdminProfileEdit/AdminProfileEditItem";

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
        <ul
          className={styles.profileTab}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <AdminProfileEditItem
            label="Ваше имя"
            id="field-firstname"
            rows={1}
            name="firstname"
            value={editState.values.firstname}
            onChange={(e) => handleInput("firstname", e.currentTarget.value)}
            placeholder="Введите ваше имя.."
            maxSigns={12}
          />

          <AdminProfileEditItem
            label="Ваша фамилия"
            id="field-lastname"
            rows={1}
            name="lastname"
            value={editState.values.lastname}
            onChange={(e) => handleInput("lastname", e.currentTarget.value)}
            placeholder="Введите вашу фамилию.."
            maxSigns={20}
          />
          
          <AdminProfileEditItem
            label="Ваше текущее фото профиля"
            id="field-avatar"
            rows={1}
            name="avatar"
            value={editState.values.avatar ?? ""}
            onChange={(e) => handleInput("avatar", e.currentTarget.value)}
            placeholder="Добавьте ссылку на ваше фото.."
          />

          <AdminProfileEditItem
            label="Текущий статус"
            id="field-bio"
            rows={1}
            name="bio"
            value={editState.values.bio ?? ""}
            onChange={(e) => handleInput("bio", e.currentTarget.value)}
            placeholder="Введите ваш текущий статус.."
            maxSigns={50}
          />

          <AdminProfileEditItem
            label="День рождения"
            id="field-birthday"
            rows={1}
            name="birthday"
            value={editState.values.birthday ?? ""}
            onChange={(e) => handleInput("birthday", e.currentTarget.value)}
            placeholder="Введите вашу дату рождения.."
          />

          <AdminProfileEditItem
            label="Ваш город"
            id="field-city"
            rows={1}
            name="city"
            value={editState.values.city ?? ""}
            onChange={(e) => handleInput("city", e.currentTarget.value)}
            placeholder="Введите ваше город.."
            maxSigns={20}
          />

          <AdminProfileEditItem
            label="Языки"
            id="field-languages"
            rows={1}
            name="languages"
            value={editState.values.languages ?? ""}
            onChange={(e) => handleInput("languages", e.currentTarget.value)}
            placeholder="Укажите языки, на которых говорите.."
          />

          <AdminProfileEditItem
            label="Место работы"
            id="field-workplace"
            rows={1}
            name="workplace"
            value={editState.values.workplace ?? ""}
            onChange={(e) => handleInput("workplace", e.currentTarget.value)}
            placeholder="Введите ваше место работы.."
            maxSigns={50}
          />


          <AdminProfileEditItem
            label="Страна проживания"
            id="field-country"
            rows={1}
            name="country"
            value={editState.values.country ?? ""}
            onChange={(e) => handleInput("country", e.currentTarget.value)}
            placeholder="Введите название вашей страны.."
            maxSigns={40}
          />

          <AdminProfileEditItem
            label="Номер телефона"
            id="field-mobile"
            rows={1}
            name="mobile"
            value={editState.values.phone_number ?? ""}
            onChange={(e) => handleInput("phone_number", e.currentTarget.value)}
            placeholder="Введите номер вашего телефона.."
            maxSigns={20}
          />

          <AdminProfileEditItem
            label="Ваш сайт"
            id="field-website"
            rows={1}
            name="website"
            value={editState.values.website ?? ""}
            onChange={(e) => handleInput("website", e.currentTarget.value)}
            placeholder="Введите адрес вашего веб-сайта.."
            maxSigns={30}
          />

          <AdminProfileEditItem
            label="Основная деятельность"
            id="field-activities"
            rows={1}
            name="activities"
            value={editState.values.activities ?? ""}
            onChange={(e) => handleInput("activities", e.currentTarget.value)}
            placeholder="Укажите ваш основной вид деятельности.."
            maxSigns={200}
          />

          <AdminProfileEditItem
            label="Увлечения/хобби"
            id="field-hobbies"
            rows={1}
            name="hobbies"
            value={editState.values.hobbies ?? ""}
            onChange={(e) => handleInput("hobbies", e.currentTarget.value)}
            placeholder="Расскажите о ваших увлечениях.."
            maxSigns={200}
          />

          <AdminProfileEditItem
            label="Любимая музыка"
            id="field-music"
            rows={1}
            name="music"
            value={editState.values.music_genres ?? ""}
            onChange={(e) => handleInput("music_genres", e.currentTarget.value)}
            placeholder="Расскажите про ваш музыкальный вкус.."
            maxSigns={200}
          />

          <AdminProfileEditItem
            label="Любимые фильмы"
            id="field-movies"
            rows={1}
            name="movies"
            value={editState.values.favorite_movies ?? ""}
            onChange={(e) =>
              handleInput("favorite_movies", e.currentTarget.value)
            }
            placeholder="Расскажите про ваши любимые фильмы.."
            maxSigns={200}
          />

          <AdminProfileEditItem
            label="Любимые игры"
            id="field-games"
            rows={1}
            name="games"
            value={editState.values.favorite_games ?? ""}
            onChange={(e) =>
              handleInput("favorite_games", e.currentTarget.value)
            }
            placeholder="Расскажите во что играете на досуге.."
            maxSigns={200}
          />

          <AdminProfileEditItem
            label="Любимые цитаты"
            id="field-quotes"
            rows={1}
            name="quotes"
            value={editState.values.favorite_quotes ?? ""}
            onChange={(e) =>
              handleInput("favorite_quotes", e.currentTarget.value)
            }
            placeholder="Поделитесь любимыми цитатами.."
            maxSigns={200}
          />

          <AdminProfileEditItem
            label="Обо мне"
            id="field-about"
            rows={1}
            name="about"
            value={editState.values.about_me ?? ""}
            onChange={(e) => handleInput("about_me", e.currentTarget.value)}
            placeholder="Расскажите подробнее о себе.."
            maxSigns={200}
          />
        </ul>
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
