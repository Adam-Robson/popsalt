'use client';
import React, { useContext } from 'react';
import { IconContext } from "@phosphor-icons/react";

export function useIcon() {
  const context = useContext(IconContext);
  if (!context) {
    throw new Error('useIcon must be used within an IconProvider');
  }
  return context;
}

export function IconProvider({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider 
      value={{
        color: "currentColor",
        size: 20,
        weight: "light", // "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
        mirrored: true
      }}>
      {children}
    </IconContext.Provider> 
  )
}

