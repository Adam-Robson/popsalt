import { RowDataPacket } from "mysql2";
import {ContactSchema} from '@/lib/schema';
import { z } from 'zod';

export type ContactInput = z.infer<typeof ContactSchema>;
export type UIField = 'name' | 'email' | 'message';
export type Status = 'idle' | 'submitting' | 'success' | 'error';

export type ZodIssueTree = {
  _errors?: readonly string[];
} & { [key: string]: ZodIssueTree | undefined };

export type FieldErrors = Partial<Record<UIField, readonly string[]>>;

export type UseContactFormOptions = {
  endpoint?: string;
  onSuccess?: () => void;
  onError?: (msg: string) => void;
};

export type SongRow = RowDataPacket & {
  id: number;
  album_id: number;
  title: string;
  filename: string;  // e.g. "01-song.mp3" or "/media/albums/1/01-song.mp3"
  track: number;
  duration: number | null;
};

export type TrackDTO = {
  id: string;
  title: string;
  src: string;
  album: string;
  trackNo: number;
  duration?: number;
};

export type TracksResponse =
  | { ok: true; tracks: TrackDTO[] }
  | { ok: false; error: string };

export type ContactResponse =
  | { ok: true; id?: string }
  | { ok: false; error: string };
