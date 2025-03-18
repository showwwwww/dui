import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { MenuItem } from '../types';
import Link from 'next/link';

const menus: MenuItem[] = [
  {
    name: 'Statistics',
    url: '/statistics',
    icon: () => <span>🏠</span>,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar className="mt-12">
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Group 1</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menus.map((project) => (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton asChild>
                  <Link href={project.url}>
                    <project.icon />
                    <span>{project.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}
