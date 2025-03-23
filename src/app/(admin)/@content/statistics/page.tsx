'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/app/contexts/i18n-context';
import { Command } from '@/app/api/commands/route';
import { cn } from '@/lib/utils';
import { levelColorMap } from '../_common';
import { EnhancedContainerInfo } from '@/app/api/containers/route';

const Footer: React.FC<{ name: string }> = ({ name }) => {
  const [commands, setCommands] = React.useState<Command[]>([]);
  const [curIdx, setCurIdx] = React.useState<number>(0);
  React.useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('/api/commands', {
          method: 'POST',
          body: JSON.stringify({ name }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data: Command[] = await response.json();
        setCommands(data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };
    fetchCommands();
  }, [name]);

  return (
    <CardFooter className="flex justify-end px-4">
      {commands.length > 0 && (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className={cn(
                    'rounded-r-none border-r-0 w-18',
                    levelColorMap[commands[curIdx].level],
                    `hover:${levelColorMap[commands[curIdx].level]}`,
                    'hover:opacity-70'
                  )}
                >
                  <span className="text-ellipsis overflow-hidden">{commands[curIdx].name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="bg-foreground/40">
                {`${commands[curIdx].name}: ${commands[curIdx].description}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="px-2 rounded-l-none bg-background focus-visible:border-foreground/10 focus-visible:ring-0"
                aria-label="Open dropdown menu"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background rounded-xl">
              <DropdownMenuRadioGroup
                value={curIdx.toString()}
                onValueChange={(e) => setCurIdx(Number(e))}
              >
                {commands.map((command, idx) => (
                  <DropdownMenuRadioItem
                    className="hover:bg-foreground/20 px-4 py-2 rounded-xl"
                    key={command._id}
                    value={idx.toString()}
                  >
                    {command.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </CardFooter>
  );
};

const AppCard: React.FC<EnhancedContainerInfo> = ({
  name,
  isRunning,
  isOperable,
  cpuPercent,
  memoryUsage,
  diskSize,
  uptime,
}) => {
  const {
    translations: {
      homePage: { statsPage },
    },
  } = useI18n();
  return (
    <Card
      className={cn(
        'w-62 h-48 text-foreground py-4 justify-between gap-1',
        !isOperable && 'border-2 border-solid border-destructive'
      )}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{name}</span>
          <Badge className={`bg-${isRunning ? 'success' : 'destructive'}`}>
            {isRunning ? statsPage.running : statsPage.stopped}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-42">
        <p>
          {statsPage.cpuPercent}:&nbsp;{cpuPercent}
        </p>
        <p>
          {statsPage.memoryUsage}:&nbsp;{memoryUsage}
        </p>
        <p>
          {statsPage.diskSize}:&nbsp;{diskSize}
        </p>
        <p>
          {statsPage.uptime}:&nbsp;{uptime}
        </p>
      </CardContent>
      {isOperable ? <Footer name={name} /> : <div />}
    </Card>
  );
};

export default function Statistics() {
  const [containers, setContainers] = React.useState<EnhancedContainerInfo[]>([]);
  React.useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await fetch('/api/containers/');
        const data = await response.json();
        setContainers(data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };
    const timer = setTimeout(() => fetchContainers(), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-start align-middle p-4 gap-4 flex-wrap">
      {containers.map((container) => (
        <AppCard key={container.name} {...container} />
      ))}
    </div>
  );
}
