// import { PlayerControls } from "@/features/mp3-play-options"
import { Mp3AudioMeta } from "@/features/mp3-set-time"
import { PlayerOptions } from "@/features/mp3-set-volume"
import styles from './Mp3Header.module.scss'


export const Mp3AudioHeader = () => {
    return (
        <div className={styles.mp3Header}>
                {/* <PlayerControls /> */}
                <Mp3AudioMeta />
                <PlayerOptions />
        </div>
    )
}

