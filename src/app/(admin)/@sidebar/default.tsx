'use client';
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
import { AppWindow, Command } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/app/contexts/i18n-context';
import { MenuItem } from '../types';

const getGroups = (
  t: TranslationKeys
): Array<{
  groupName: string;
  menus: MenuItem[];
}> => {
  return [
    {
      groupName: t.homePage.sidebar.dockerGroup.title,
      menus: [
        {
          name: t.homePage.sidebar.dockerGroup.stats,
          url: '/statistics',
          icon: () => <AppWindow />,
        },
        {
          name: t.homePage.sidebar.dockerGroup.commands,
          url: '/commands',
          icon: () => <Command />,
        },
      ],
    },
  ];
};

export default function AppSidebar() {
  const { translations } = useI18n();
  const groups = getGroups(translations);
  return (
    <Sidebar className="mt-12">
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.groupName}>
            <SidebarGroupLabel>{group.groupName}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.menus.map((menu) => (
                  <Link key={menu.url} href={menu.url}>
                    <SidebarMenuItem className="hover:bg-foreground/20">
                      <SidebarMenuButton>
                        <menu.icon />
                        {menu.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
