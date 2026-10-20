import { PersonalInfo } from "@/shared/ui";
import styles from "./AccountPersonalHidden.module.scss";
import { useSelectBirthLocation, useSelectPhone, useSelectWebsite } from "../../model/useProfileData";

export const ContactsInfo = () => {
  
  const country = useSelectBirthLocation() || ""
  const mobile = useSelectPhone() || ""
  const website = useSelectWebsite() || ""
  const dataExist = country || mobile || website

    if (dataExist) {
    return (
      <div className={styles.contactsInfo}>
        <h3 className={styles.infoHeader}>Контактная информация</h3>
        {country?.length > 0 && <PersonalInfo label="Место рождения" children={country}/>}
        {mobile?.length > 0 && <PersonalInfo label="Моб. Телефон" children={mobile} />}
        {website?.length > 0 && <PersonalInfo label="Веб-сайт" children={website} />}
      </div>
    );
  }
};
