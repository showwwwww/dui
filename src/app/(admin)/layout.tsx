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
    <SidebarProvider className="min-h-50">
      {sidebar}
      <main>
        <SidebarTrigger />
        {content}
      </main>
    </SidebarProvider>
  );
}
