'use server';
// app/page.tsx
import { MainContent } from './ui/main_page/main-content';
import { TopBar } from './ui/main_page/top-bar';
import { Suspense } from 'react';

// This is now a Server Component by default (no 'use client')
export default async function MainPage() {
  return (
    <div>
      <div className="mt-2 h-16 w-full flex-shrink-0 px-2 py-1">
        <Suspense fallback={<div>Loading top bar...</div>}>
          <TopBar />
        </Suspense>
      </div>

      <div className="flex h-screen max-h-[calc(100dvh-4.5rem)] w-full flex-col p-2">
        <Suspense fallback={<div>Loading chat...</div>}>
          <MainContent />
        </Suspense>
      </div>
    </div>
  );
}
