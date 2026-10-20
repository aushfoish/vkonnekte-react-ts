import { useSelectBirthday, useSelectLanguages, useSelectWorkplace } from '../../model/useProfileData';
import styles from './AccountPersonalHidden.module.scss'
import {  PersonalInfo } from "@/shared/ui";

export const AccountPersonal = () => {
  const birthday = useSelectBirthday()
  const workplace = useSelectWorkplace()
  const languages = useSelectLanguages()

  const hasFullBirthday = birthday;
  const formatedBirthday = hasFullBirthday
    ? `${birthday}`
    : "очень старый";

  const formatedWorkplace = workplace || "вероятно, ещё и безработный";

  const languagesList =
    languages || "поди и языков никаких не знает";

  return (
    <div className={styles.contactsInfo}>
      <PersonalInfo label="День рождения" children={formatedBirthday}/>

      <PersonalInfo label="Место работы" children={formatedWorkplace}/>

      <PersonalInfo
        label="Языки (какие знаю)"
        children={languagesList}
      />
    </div>
  );
};
