import {
  useSelectBirthday,
  useSelectLanguages,
} from "../../model/useProfileData";
import styles from "./AccountPersonalHidden.module.scss";
import { PersonalInfo } from "@/shared/ui";

export const AccountPersonal = () => {
  const birthday = useSelectBirthday();
  const languages = useSelectLanguages();

  const hasFullBirthday = birthday;
  const formatedBirthday = hasFullBirthday ? `${birthday}` : "не указан";

  const languagesList = languages;

  return (
    <div className={styles.contactsInfo}>
      <PersonalInfo label="День рождения" children={formatedBirthday} />
      {languages && (
        <PersonalInfo label="Языки (какие знаю)" children={languagesList} />
      )}
    </div>
  );
};
