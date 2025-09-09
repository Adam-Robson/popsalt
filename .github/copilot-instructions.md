# Copilot Instructions for popsalt

## Project Overview
- This is a Next.js app (App Router, TypeScript) bootstrapped with `create-next-app`.
- Audio playback is a core feature, managed via React context in
  `src/contexts/audio-provider.tsx` and related files.
- The app uses the `howler` library for audio, and playlists are defined in 
  `src/constants/playlist.tsx`.
- UI components and context providers are colocated under `src/components` and 
  `src/contexts`.
- Types are defined in `src/types/`.

## Key Architectural Patterns
- **Context Providers:** All global state (audio, theme, icons, etc.) is managed via
  React context providers in `src/contexts/`. Each provider exposes a custom hook
  and a value object matching its TypeScript interface.
- **Audio Flow:** The `AudioProvider` manages playback state, current track, playlist,
  and exposes imperative controls (play, pause, next, etc.) via context. The `Howl` 
  instance is managed with a ref and lifecycle hooks.
- **Type Safety:** All context values and major data structures are strongly typed.
  When updating context, ensure the value matches the interface in
  `src/types/audio-provider.tsx`.
- **Component Structure:** UI is organized by feature, with reusable components
  in `src/components/` and feature logic in `src/contexts/` and `src/hooks/`.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
- **Edit Main Page:** `src/app/page.tsx` is the entry point for the main UI.
- **Add Audio Features:** Update `src/contexts/audio-provider.tsx` and its type in `src/types/audio-provider.tsx`.
- **Add Songs:** Edit `src/constants/playlist.tsx`.
- **Type Definitions:** Add or update types in `src/types/`.

## Project-Specific Conventions
- **Context Value Shape:** Always keep the context value in sync with its TypeScript interface. If you add a new property to the provider, update the type.
- **Playlist Structure:** Each song in the playlist must match the `SongType` defined in `src/types/song.ts`.
- **Imports:** Use absolute imports with `@/` alias for `src/`.

## Integration Points
- **Audio:** Uses `howler` for playback. All audio logic is centralized in the audio provider.
- **Theme:** Theme toggling is handled in `src/components/theme-toggle/` and `src/contexts/theme-provider.tsx`.

## Examples
- To add a new context value, update both `src/contexts/audio-provider.tsx` and `src/types/audio-provider.tsx`.
- To add a new song, append to the array in `src/constants/playlist.tsx`.

---

For more details, see the README or the relevant file in `src/`.
