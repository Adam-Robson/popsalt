'use client';

import {
  PlayIcon, PauseIcon, SkipForwardIcon, SkipBackIcon,
  XIcon, MoonIcon, SunIcon, SpeakerHighIcon, SpeakerLowIcon,
  SpeakerNoneIcon, SpeakerSlashIcon,  ListIcon, QuestionIcon,
  EarIcon, EarSlashIcon

} from '@phosphor-icons/react';
import type React from 'react';

const ICONS = {
  play: PlayIcon,
  pause: PauseIcon,
  skipForward: SkipForwardIcon,
  skipBack: SkipBackIcon,
  volume: SpeakerHighIcon,
  playlist: ListIcon,
  moon: MoonIcon,
  sun: SunIcon,
  x: XIcon,
  question: QuestionIcon,
  SpeakerLowIcon,
  SpeakerSlashIcon, 
  SpeakerNoneIcon,
  ear: EarIcon,
  earSlash: EarSlashIcon,
} as const;

type IconName = keyof typeof ICONS;

type Phosphor = React.ComponentProps<typeof QuestionIcon>;
type Size = Phosphor['size'];
type Weight = Phosphor['weight'];

export default function Icon({
  name,
  size = 20 as Size,
  weight = 'regular' as Weight,
  className,
  label,
}: {
  name: IconName;
  size?: Size;
  weight?: Weight;
  className?: string;
  label?: string;
}) {
  const Ph = ICONS[name] ?? ICONS.question;
  return (
    <Ph
      size={size}
      weight={weight}
      className={className}
      aria-label={label}
      data-icon={name}
      color="currentColor"
    />
  );
}
