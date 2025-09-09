'use client';

import { useState } from 'react';
import GlobalProvider from "@/contexts/global-provider";
import Footer from '@/components/page-components/footer';
import Header from '@/components/page-components/header';
import { Main } from '@/components/page-components/main';

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState<'about' | 'contact' | null>(null);

  return (
    <div className="fade-up-stagger">
      <GlobalProvider>
        <div className="root max-w-screen-xl w-full mx-auto p-2">
          <Header setOpenDrawer={setOpenDrawer} />
          <Main open={openDrawer} onClose={() => setOpenDrawer(null)} />
          <Footer />
        </div>
      </GlobalProvider>
    </div>
  );
}
