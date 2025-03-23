'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useI18n } from '@/app/contexts/i18n-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { levelColorMap } from '../_common';
import { Command } from '@/app/api/commands/route';

export default function Commands() {
  const {
    translations: {
      homePage: { commandsPage },
    },
  } = useI18n();
  const [commands, setCommands] = React.useState<Array<Command>>([]);
  React.useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('/api/commands/');
        const data = await response.json();
        setCommands(data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };
    fetchCommands();
  }, []);
  return (
    <Table>
      <TableCaption>{commandsPage.caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{commandsPage.columns.name}</TableHead>
          <TableHead>{commandsPage.columns.command}</TableHead>
          <TableHead>{commandsPage.columns.params}</TableHead>
          <TableHead>{commandsPage.columns.description}</TableHead>
          <TableHead>{commandsPage.columns.tags.title}</TableHead>
          <TableHead className="text-center w-[200px]">
            {commandsPage.columns.actions.title}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commands.map((command) => (
          <TableRow key={command._id}>
            <TableCell className="font-medium">{command.name}</TableCell>
            <TableCell>{command.command}</TableCell>
            <TableCell>{command.params.join(' ')}</TableCell>
            <TableCell>{command.description}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {command.isDefault && <Badge>{commandsPage.columns.tags.default}</Badge>}
                <Badge className={levelColorMap[command.level]}>
                  {commandsPage.columns.tags.levels[command.level]}
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2 justify-center">
                <Button size="sm" disabled={!command.isEditable}>
                  {commandsPage.columns.actions.edit}
                </Button>
                <Button size="sm" disabled={!command.isEditable} className="bg-destructive">
                  {commandsPage.columns.actions.delete}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
