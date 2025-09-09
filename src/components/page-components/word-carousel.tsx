'use client';

import React, { useEffect, useState } from 'react';
import type { WordCarouselType } from '@/types/word-carousel';

export default function WordCarousel({ 
  words, 
  hold = 3000, 
  fade = 1000, 
  className 
}: WordCarouselType) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % words.length);
    }, hold);
    return () => clearInterval(id);
  }, [words.length, hold]);

  return (
    <span
      key={index}
      className={className}
      style={{
        display: 'inline-block',
        opacity: 1,
        transition: `opacity ${fade}ms ease-in-out`,
      }}
    >
      {words[index]}
    </span>
  );
}
