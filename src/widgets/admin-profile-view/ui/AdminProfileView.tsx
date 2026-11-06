import type { ProfileItem } from "@/shared/api/schemas/userProfileSchema";
import { PersonalInfo } from "@/shared/ui";
import styles from './EditProfileView.module.scss'

export const AdminProfileView = ({profile}: {profile: ProfileItem} ) => {
  return (
    <div className={styles.profileTab}>
      <PersonalInfo label="Ваше имя" children={profile?.firstname} />
      <PersonalInfo label="Ваша фамилия" children={profile?.lastname} />
      <PersonalInfo
        label="Ваше текущее фото профиля"
        children={
          <img
            src={`${profile?.avatar}`}
            style={{ maxHeight: 400, maxWidth: 250 }}
          ></img>
        }
      />
      <PersonalInfo label="Текущий статус" children={profile?.bio} />
      <PersonalInfo label="День рождения" children={profile?.birthday} />
      <PersonalInfo label="Ваш город" children={profile?.city} />
      <PersonalInfo label="Языки" children={profile?.languages} />
      <PersonalInfo label="Место работы" children={profile?.workplace} />
      <PersonalInfo label="Страна проживания" children={profile?.country} />
      <PersonalInfo label="Номер телефона" children={profile?.phone_number} />
      <PersonalInfo
        label="Ваш сайт"
        children={
          <a href={`https://${profile?.website}/`}>{profile?.website}</a>
        }
      />
      <PersonalInfo
        label="Основная деятельность"
        children={profile?.activities}
      />
      <PersonalInfo label="Увлечения/хобби" children={profile?.hobbies} />
      <PersonalInfo label="Любимая музыка" children={profile?.music_genres} />
      <PersonalInfo
        label="Любимые фильмы"
        children={profile?.favorite_movies}
      />
      <PersonalInfo label="Любимые игры" children={profile?.favorite_games} />
      <PersonalInfo
        label="Любимые цитаты"
        children={profile?.favorite_quotes}
      />
      <PersonalInfo label="Обо мне" children={profile?.about_me} />
    </div>
  );
};
