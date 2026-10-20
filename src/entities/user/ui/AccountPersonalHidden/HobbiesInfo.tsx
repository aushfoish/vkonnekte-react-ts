import { useSelectAbout, useSelectActivities, useSelectGames, useSelectHobbies, useSelectMovies, useSelectMusic } from "../../model/useProfileData";
import styles from "./AccountPersonalHidden.module.scss";
import { PersonalInfo } from "@/shared/ui";


export const HobbiesInfo = () => {
    
    const hobbies = useSelectHobbies() || ''
    const activities = useSelectActivities() || ''
    const movies = useSelectMovies() || ''
    const music = useSelectMusic() || ''
    const games = useSelectGames() || ''
    const about = useSelectAbout() || ''
    const dataExist = hobbies || activities || movies || games || about

    if (dataExist) {
    return (
        <div className={styles.contactsInfo}>
          <h3 className={styles.infoHeader}>Личная информация</h3>
          {activities.length > 0 && <PersonalInfo label="Деятельность" children={activities}/>}
          {hobbies.length > 0 && <PersonalInfo label="Увлечения" children={hobbies} />}
          {movies.length > 0 && <PersonalInfo label="Любимые фильмы" children={movies} />}
          {music.length > 0 && <PersonalInfo label="Любимая музыка" children={music} />}
          {games.length > 0 && <PersonalInfo label="Любимые игры" children={games} />}
          {about.length > 0 && <PersonalInfo label="О себе" children={about} />}
        </div>
    )}
}