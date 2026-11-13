import { PersonalInfo } from "@/shared/ui";
import styles from "./AccountPersonalHidden.module.scss";
import {
  ContactsInfoCheck,
  useSelectCity,
  useSelectCountry,
  useSelectPhone,
  useSelectWebsite,
  useSelectWorkplace,
} from "../../model/useProfileData";

export const ContactsInfo = () => {
  const country = useSelectCountry();
  const city = useSelectCity();
  const mobile = useSelectPhone();
  const website = useSelectWebsite();
  const workplace = useSelectWorkplace();
  const check = ContactsInfoCheck();

  if (check)
    return (
      <div className={styles.contactsInfo}>
        <h3 className={styles.infoHeader}>Контактная информация</h3>
        {country?.trim() && (
          <PersonalInfo label="Место рождения" children={country} />
        )}
        {city?.trim() && (
          <PersonalInfo label="Город проживания" children={city} />
        )}
        {workplace?.trim() && (
          <PersonalInfo label="Место работы" children={workplace} />
        )}
        {mobile?.trim() && (
          <PersonalInfo label="Моб. Телефон" children={mobile} />
        )}
        {website?.trim() && (
          <PersonalInfo label="Веб-сайт" children={website} />
        )}
      </div>
    );
};
