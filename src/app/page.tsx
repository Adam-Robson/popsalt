'use client';

import { useState } from 'react';
import GlobalProvider from "@/contexts/global-provider";
import Footer from '@/components/page-components/landing-footer';
import Header from '@/components/page-components/landing-header';

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState<'about' | 'contact' | null>()
 
  return (
    <div className="root">
      <GlobalProvider>
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header setOpenDrawer={setOpenDrawer} />
        <Footer />
        </div>
      </GlobalProvider>
    </div>
  );
}
