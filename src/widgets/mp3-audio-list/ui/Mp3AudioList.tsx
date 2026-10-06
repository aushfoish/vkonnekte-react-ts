import { Mp3ListItem } from "@/entities/mp3-player/ui/Mp3ListItem/Mp3ListItem";
import {
  userMusicFetch,

} from "@/entities/mp3-player/model/useMusicStore";
import styles from "./Mp3AudioList.module.scss";
import { useFetchMusic } from "@/entities/mp3-player/model/useFetchMusic";
import { Mp3ListSkeleton } from "@/shared/ui/SkeletonAudioList/Mp3TrackListSkeleton";
import { Button, ContainerPlaceholder } from "@/shared/ui";
import type { FullMusicItemSchema } from "@/shared/api/schemas/musicItemSchema";

export const Mp3AudioList = () => {
  const { data: playlist = [], isLoading, isError, refetch } = useFetchMusic();

  const isPlaying = userMusicFetch((state) => state.isPlaying);
  const currentTrack = userMusicFetch((state) => state.currentTrack);
  const trackPlay = userMusicFetch((state) => state.trackPlay);

  if (isLoading) {
    return (
      <div className={styles.mp3TrackList}>
        <div className={styles.mp3ListItems}>
          <Mp3ListSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.mp3TrackList}>
        <div className={styles.mp3ListItems}>
          <ContainerPlaceholder label="Не удалось загрузить плейлист" />
          <Button
            children="Перезагрузить плейлист"
            className="refetch"
            onClick={refetch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mp3TrackList}>
      <div className={styles.mp3ListItems}>
        {playlist.map((track: FullMusicItemSchema, index: number) => (
          <Mp3ListItem
            index={index}
            id={track.band}
            key={track.id}
            children={currentTrack?.id === track.id && isPlaying ? "❚❚" : "▶"}
            title={track.title}
            band={track.band}
            audioSrc={track.src}
            playOnClick={() => trackPlay(track)}
            time={track.duration ?? "--/--"}
          />
        ))}
      </div>
    </div>
  );
};
