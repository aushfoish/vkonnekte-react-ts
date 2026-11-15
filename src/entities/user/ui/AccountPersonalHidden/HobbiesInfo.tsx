import {
  PersonalInfoCheck,
  useSelectAbout,
  useSelectActivities,
  useSelectGames,
  useSelectHobbies,
  useSelectMovies,
  useSelectMusic,
  useSelectQuotes,
} from "../../model/useProfileData";
import styles from "./AccountPersonalHidden.module.scss";
import { PersonalInfo } from "@/shared/ui";

export const HobbiesInfo = () => {
  const hobbies = useSelectHobbies() || "";
  const activities = useSelectActivities() || "";
  const movies = useSelectMovies() || "";
  const music = useSelectMusic() || "";
  const games = useSelectGames() || "";
  const about = useSelectAbout() || "";
  const quotes = useSelectQuotes() || "";

  const check = PersonalInfoCheck();

  if (check)
    return (
      <div className={styles.contactsInfo}>
        <h3 className={styles.infoHeader}>Личная информация</h3>
        {activities.trim() && (
          <PersonalInfo label="Деятельность" children={activities} />
        )}
        {hobbies.trim() && (
          <PersonalInfo label="Увлечения" children={hobbies} />
        )}
        {movies.trim() && (
          <PersonalInfo label="Любимые фильмы" children={movies} />
        )}
        {music.trim() && (
          <PersonalInfo label="Любимая музыка" children={music} />
        )}
        {games.trim() && <PersonalInfo label="Любимые игры" children={games} />}
        {about.trim() && <PersonalInfo label="О себе" children={about} />}
        {quotes.trim() && (
          <PersonalInfo label="Любимые цитаты" children={quotes} />
        )}
      </div>
    );
};
