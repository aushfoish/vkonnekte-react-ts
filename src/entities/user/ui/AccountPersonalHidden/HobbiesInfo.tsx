import { useSelectPersonal } from "../../model/useFetchPage";
import styles from "./AccountPersonalHidden.module.scss";
import { PersonalInfo } from "@/shared/ui";


export const HobbiesInfo = () => {
    const HOBBIES_SECTION_LABELS = {
    activity: "Деятельность",
    hobbies: "Увлечения",
    music: "Любимая музыка",
    movies: "Любимые фильмы",
    quotes: "Любимые цитаты",
  } as const;
    const hobbiesInfo = useSelectPersonal();

    if (hobbiesInfo !== undefined && hobbiesInfo) {
    return (
        <div className={styles.contactsInfo}>
          <h3 className={styles.infoHeader}>Личная информация</h3>

          {Object.entries(HOBBIES_SECTION_LABELS).map(([field, label]) => {
            const textValue = hobbiesInfo[field as keyof typeof hobbiesInfo];

            return (
              <PersonalInfo key={field} children={textValue} label={label} />
            );
          })}
        </div>
    )}
}