import { create } from "zustand";
import { formatTime } from "@/entities/mp3-player/lib/formatTime";
import type { ChangeEvent } from "react";
import type { FullMusicItemSchema } from "@/shared/api/schemas/musicItemSchema";



export interface userPlaylistState {
  isLoading: boolean;
  trackPlay: (track: FullMusicItemSchema) => Promise<void>;
  isPlaying: boolean;
  currentTrack: FullMusicItemSchema | null;
  togglePlay: () => void;
  volume: number;
  setVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  currentTimeFormat: string | null;
  currentTimeChanger: (e: ChangeEvent<HTMLInputElement>) => void;
  currentTrackTime: number | null;
  currentTotalSeconds: number | null;
  currentTrackIndex: number | null;
  // indexCheck: () => void
  nextTrack: () => void;
  currentAudioTime: string;
  audio: HTMLAudioElement | null;
}

export const userMusicFetch = create<userPlaylistState>((set, get) => ({
  isLoading: false,
  isPlaying: false,
  currentTrack: null,
  currentTrackIndex: null,
  currentTimeFormat: null,
  volume: 0.2,
  currentTrackTime: null,
  currentTotalSeconds: null,
  currentAudioTime: "--/--",

  audio: typeof window !== "undefined" ? new Audio() : null,

  

  trackPlay: async (track) => {
    const { volume, togglePlay, currentTrack, audio } = get();

    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }

    if (!audio) return;
    try {
      audio.ontimeupdate = () => {
        const totalSeconds = audio.currentTime;
        const time = String(formatTime(audio.duration));
        const timer = formatTime(totalSeconds);
        set({
          currentTimeFormat: timer,
          currentAudioTime: time,
          currentTotalSeconds: audio.duration,
          currentTrackTime: audio.currentTime,
        });
      };
      audio.src = track.src;
      audio.volume = volume;

      await audio.play();

      set({ currentTrack: track, isPlaying: true });
    } catch (error) {
      console.error(
        error instanceof Error
          ? error.message
          : "не удалось воспроизвести трек",
      );
    }
  },

  togglePlay: () => {
    const { currentTrack, isPlaying, audio } = get();

    if (!currentTrack) return;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else if (!isPlaying) {
      audio.play();
    }

    set({ isPlaying: !isPlaying });
  },

  setVolume: (e) => {
    const audio = get().audio
    if (!audio) return
    audio.volume = Number(e.currentTarget.value) / 100;
    set({ volume: audio.volume });
  },


  currentTimeChanger: (e) => {
    const audio = get().audio
    if (!audio) return
    audio.currentTime = Number(e.currentTarget.value);
    set({ currentTrackTime: audio.currentTime });
  },

  // indexCheck: () => {
  //     const {currentTrack, playlist} = get()

  //     const trackIndex = playlist?.map((track, index) => {
  //         if (currentTrack?.id === track.id) {
  //             set({currentTrackIndex: index})
  //         }

  //     })
  // },

  nextTrack: () => {
    const { currentTrackIndex } = get();
    if (currentTrackIndex !== null) {
      console.log("следующий трек:");
    }
  },
}));
