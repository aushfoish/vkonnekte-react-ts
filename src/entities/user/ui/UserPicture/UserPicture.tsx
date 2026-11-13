import {
  useSelectAvatar,
  useSelectFirstname,
  useSelectLastname,
} from "../../model/useProfileData";
import styles from "./UserPicture.module.scss";
import placeholder from "@/shared/assets/avatar-placeholder.jpg";

export const UserPicture = () => {
  const avatar = useSelectAvatar();
  const firstname = useSelectFirstname();
  const lastname = useSelectLastname();

  const fname = firstname || "";
  const lname = lastname || "";
  const combinedName = `${fname} ${lname}`.trim();
  const fullname = combinedName || "этой страницы";

  if (avatar)
    return (
      <div className={styles.userPicture}>
        <img
          alt={`фотография пользователя ${fullname}`}
          className={styles.profilePicture}
          src={avatar}
        ></img>
      </div>
    );

  if (!avatar)
    return (
      <div className={styles.userPicture}>
        <img
          alt={`Пользователь ${fullname} не добавил фотографию профиля`}
          className={styles.profilePicture}
          src={placeholder}
        ></img>
      </div>
    );
};
