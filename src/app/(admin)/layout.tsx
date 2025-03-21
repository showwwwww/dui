import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Layout({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-full overflow-hidden">
      {sidebar}
      <main className="flex-1">
        <SidebarTrigger />
        <div className="h-[calc(100%-var(--spacing)*6)]">{content}</div>
      </main>
    </SidebarProvider>
  );
}
