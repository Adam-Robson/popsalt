import type { SongType } from '@/types/song';

export interface AlbumType {
  id: number;
  title: string;
  artist: string;
  cover: string;
  year: number;
  description: string;
  songs: SongType[];
}
