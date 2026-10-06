import { useFetchMusic } from "@/entities/mp3-player/model/useFetchMusic"
import styles from './AdminPostsTable.module.scss'
import { AdminMusicTableItem } from "@/features/admin-tab-mp3-item"

export const AdminAudioTable = () => {
    const {data: playlist = []} = useFetchMusic()

    return (
        <>
            <div className={styles.postsTable}>
                {playlist.map((track) => (
                    <AdminMusicTableItem 
                        id={track.id}
                        band={track.band}
                        title={track.title}
                        src={track.src}
                        duration={track.duration}
                        />
                ))}
            </div>
        </>
    )
}