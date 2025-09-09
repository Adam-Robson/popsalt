import { SetStateAction } from 'react';

type OpenDrawerType = 'about' | 'contact' | null;

export type HeaderType = {
  openDrawer: (section: OpenDrawerType) => SetStateAction<OpenDrawerType>;
}

export type OpenDrawerPropsType = {
  setOpenDrawer: (section: OpenDrawerType) => void;
}
