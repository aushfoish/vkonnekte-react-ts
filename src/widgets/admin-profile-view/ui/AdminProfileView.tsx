import type { ProfileItem } from "@/shared/api/schemas/userProfileSchema";
import { Input, Loader, PersonalInfo } from "@/shared/ui";
import styles from "./EditProfileView.module.scss";
import { handleFileReaderAvatar } from "@/shared/lib/file/useFileReaderAvatars";
import { useState } from "react";
import { useUpdateUserpic } from "@/entities/user/model/useUpdateUserpic";

export const AdminProfileView = ({ profile }: { profile: ProfileItem }) => {
  const { mutate: editUserpic } = useUpdateUserpic();
  const [uploading, setUploading] = useState(false);
  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const userpicUrls = await handleFileReaderAvatar(e);
      if (!userpicUrls) return
      editUserpic({ id: profile.id, avatar: userpicUrls.avatar, avatar_mini_50: userpicUrls.avatar_mini_50, avatar_main_page: userpicUrls.avatar_main_page});
      setUploading(false)
    } catch (error) {
      console.log('Не дошло до загрузки:', error)
      setUploading(false)
    }
    
    
      
    
  };
  return (
    <div className={styles.profileTab}>
      <>
      <div className={styles.avatars} style={{display: 'flex', flexDirection: "row", columnGap: '10px', alignItems: 'end'}}>
        <PersonalInfo
          label="Ваше фото"
          children={
            profile.avatar ? (
              <img
                src={`${profile?.avatar}`}
                style={{ maxHeight: 300, maxWidth: 200 }}
              ></img>
            ) : (
              "фото не выбрано"
            )
          }
        />
        <img src={`${profile.avatar_main_page}`} style={{maxWidth: 150, maxHeight: 150}} alt="фото, которое видят пользователи на вашей странице"></img>
        <img src={`${profile.avatar_mini_50}`} style={{maxWidth: 50, maxHeight: 50}} alt="фото, которое видят пользователи в ваших постах и комментариях"></img>
        
      </div>
        
        {uploading ? (<Loader />)
      : <Input
          id="userpic"
          placeholder="добавьте ваше фото.."
          type="file"
          label="Выбрать новое фото профиля"
          className={styles.authInputLabel}
          classInput={styles.authInput}
          containerClass={styles.authInput}
          onChange={onUploadFile}
          accept="image/*"
        />}
      </>

      <PersonalInfo label="Ваше имя" children={profile?.firstname} />
      <PersonalInfo label="Ваша фамилия" children={profile?.lastname} />

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
