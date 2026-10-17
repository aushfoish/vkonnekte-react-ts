import { PersonalInfo } from "@/shared/ui";
import { useSelectContacts } from "../../model/useFetchPage";
import styles from "./AccountPersonalHidden.module.scss";

export const ContactsInfo = () => {
  const CONTACTS_SECTION_LABELS = {
    city: "Город проживания",
    github: "Github",
    mobile: "Моб. Телефон",
    telegram: "Telegram",
  } as const;

  const contactsInfo = useSelectContacts();

  if (contactsInfo !== undefined && contactsInfo) {
    return (
      <div className={styles.contactsInfo}>
        <h3 className={styles.infoHeader}>Контактная информация</h3>
        {Object.entries(CONTACTS_SECTION_LABELS).map(([field, label]) => {
          const textValue = contactsInfo[field as keyof typeof contactsInfo];

          return (
            <PersonalInfo key={field} children={textValue} label={label} />
          );
        })}
      </div>
    );
  }
};
