'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  JSX,
} from 'react';
import { Howl } from 'howler';
import { playlist as _playlist } from '@/constants/playlist';
import type { SongType } from '@/types/song';
import type { AudioProviderType } from '@/types/audio-provider';

const AudioContext = createContext<AudioProviderType | undefined>(undefined);

export function useAudio(): AudioProviderType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export function AudioProvider({ children }: { children: ReactNode }): JSX.Element {
  // initialize howl reference
  const audioRef = useRef<Howl | null>(null);

  // state
  const [playback, setPlayback] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [mute, setMute] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<SongType | null>(null);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<SongType[]>(_playlist);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  function loadTrack(track: SongType | null) {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current.unload();
    }
    setLoading(true);

    const sound = new Howl({
      src: [track?.src ?? ''],
      html5: true,
      autoplay: false,    volume,
      mute: false,
      onload: () => {
        setDuration(sound.duration());
        setLoading(false);
        setError(null);
      },
      onplay: () => {
        setPlayback(true);

        // Start updating elapsed time immediately
        const update = () => {
          if (sound.playing()) {
            setElapsed(sound.seek() as number);
            requestAnimationFrame(update);
          }
        };
        requestAnimationFrame(update);
      },
      onpause: () => {
        setPlayback(false);
      },
      onend: () => {
        setPlayback(false);
        setElapsed(0);
        nextSong();
      },
      onloaderror: (_, err) => {
        setError(`Error loading: ${err}`);
        setLoading(false);
      },
    });

    audioRef.current = sound;
    sound.play();
  };

  function setTrack(track: SongType, autoPlay = false) {
    setCurrentTrack(track);
    const index = playlist.findIndex(t => t.src === track.src);
    if (index >= 0) localStorage.setItem('trackIndex', String(index));

    loadTrack(track);
    if (autoPlay && userInteracted) audioRef.current?.play();
  }

  function play() {
    if (!userInteracted || !currentTrack) return;
    if (!audioRef.current) loadTrack(currentTrack);
    audioRef.current?.play();
    setPlayback(true);
  }

  function pause() {
    audioRef.current?.pause();
    setPlayback(false);
  }

  function stop() {
    audioRef.current?.stop();
    setPlayback(false);
    setElapsed(0);
  }

  function toggleMute() {
    setMute(!mute);
    audioRef.current?.mute(!mute);
  }

  function updateVolume(vol: number) {
    setVolume(vol);
    audioRef.current?.volume(vol);
    if (vol === 0) {
      setMute(true);
      audioRef.current?.mute(true);
    } else if (mute) {
      setMute(false);
      audioRef.current?.mute(false);
    }
    localStorage.setItem('volume', String(vol));
  }

  function nextSong() {
    if (playlist.length === 0) return;
    const i = getIndex();
    const n = playlist[(i + 1) % playlist.length];
    setCurrentTrack(n);
  }

  function previousSong() {
    if (playlist.length === 0) return;
    const i = getIndex();
    const p = playlist[(i - 1 + playlist.length) % playlist.length];
    setCurrentTrack(p);
  }

  function formatTime(secs: number) {
    if (secs === null || isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs - minutes * 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const normalizedTrack = useMemo(() => {
    if (!currentTrack) return undefined;
    if (typeof currentTrack === 'object' && 'id' in currentTrack) {
      return currentTrack as SongType;
    }
    if (typeof currentTrack === 'number') return playlist?.[currentTrack];
    return undefined;
  }, [currentTrack, playlist]);

  const trackTitle = normalizedTrack?.title ?? '';

  const safePct = useMemo(() => {
    const d = Number(duration);
    const e = Number(elapsed);
    if (!Number.isFinite(d) || d <= 0 || !Number.isFinite(e) || e < 0) return 0;
    return Math.max(0, Math.min(100, (e / d) * 100));
  }, [elapsed, duration]);

  useEffect(() => {
    const mark = () => setUserInteracted(true);
    window.addEventListener('click', mark, { once: true });
    window.addEventListener('keydown', mark, { once: true });
    return () => {
      window.removeEventListener('click', mark);
      window.removeEventListener('keydown', mark);
    };
  }, []);

  const getIndex = () => currentTrack ? playlist.findIndex(t => t.src === currentTrack.src) : -1;

  useEffect(() => {
    const savedVolume = parseFloat(localStorage.getItem('volume') || '1');
    const savedIndex = parseInt(localStorage.getItem('trackIndex') || '0', 10);

    if (!isNaN(savedVolume)) setVolume(savedVolume);
    if (!isNaN(savedIndex) && playlist[savedIndex]) {
      setCurrentTrack(playlist[savedIndex]);
    } else if (playlist.length > 0) {
      setCurrentTrack(playlist[0]);
    }
  }, [playlist]);

  useEffect(() => {
    let frameId: number;

    const trackTime = () => {
      if (audioRef.current?.playing()) {
        setElapsed(audioRef.current.seek() as number);
        frameId = requestAnimationFrame(trackTime);
      }
    };

    if (playback) frameId = requestAnimationFrame(trackTime);
    return () => cancelAnimationFrame(frameId);
  }, [playback]);

  const value = {
    playlist,
    setPlaylist,
    showPlaylist,
    setShowPlaylist,
    playback,
    setPlayback,
    volume,
    setVolume,
    mute,
    setMute,
    duration,
    setDuration,
    elapsed,
    setElapsed,
    showPlayer,
    setShowPlayer,
    loading, 
    setLoading,
    error,
    setError,
    currentTrack,
    setCurrentTrack,
    trackTitle,
    userInteracted,
    setUserInteracted,
    formatTime,
    setTrack,
    normalizedTrack,
    safePct,
    play, 
    pause,
    stop,
    toggleMute,
    nextSong,
    previousSong,
    updateVolume
  };
      return ( 
    <AudioContext.Provider 
      value={value}
    >
      {children}
    </AudioContext.Provider>
  )
}
