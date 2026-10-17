import { useFetchMusic } from "@/entities/mp3-player/model/useFetchMusic"
import styles from './AdminPostsTable.module.scss'
import { AdminMusicTableItem } from "@/features/admin-tab-mp3-item"
import { useDeleteTrack } from "@/entities/mp3-player/model/useDeleteTrack"

export const AdminAudioTable = () => {
    const {data: playlist = []} = useFetchMusic()
    const {mutate: deleteTrack} = useDeleteTrack()

    return (
        <>
            <div className={styles.postsTable}>
                {playlist.map((track) => (
                    <AdminMusicTableItem
                        key={track.id} 
                        id={track.id}
                        band={track.band}
                        title={track.title}
                        src={track.src}
                        duration={track.duration}
                        onDelete={() => deleteTrack(track.id)}
                        />
                ))}
            </div>
        </>
    )
}