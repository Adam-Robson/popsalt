'use client';

import { SongType } from './song';

export interface AudioProviderType {
  playlist: SongType[];
  setPlaylist: React.Dispatch<React.SetStateAction<SongType[]>>;
  showPlaylist: boolean;
  setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>;
  showPlayer: boolean;
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  playback: boolean;
  setPlayback: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  mute: boolean;
  setMute: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMute: () => void;
  nextSong: () => void;
  previousSong: () => void;
  elapsed: number;
  setElapsed: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  currentTrack: SongType | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<SongType | null>>;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setTrack: (track: SongType, autoPlay?: boolean) => void;
  normalizedTrack: SongType | undefined;
  trackTitle?: string;
  safePct: number;
  formatTime: (seconds: number) => string;
  userInteracted: boolean;
  setUserInteracted: React.Dispatch<React.SetStateAction<boolean>>;
}
