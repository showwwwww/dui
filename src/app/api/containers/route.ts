import Dockerode from 'dockerode';
import { NextResponse } from 'next/server';

const docker = new Dockerode({ socketPath: '/var/run/docker.sock' });

interface EnhancedContainerInfo {
  id: string;
  name: string;
  status: string;
  running: boolean;
  memoryUsage: string;
  cpuPercent: number;
  uptime: string;
  diskSize: string;
}

export async function GET() {
  try {
    const allContainers = await docker.listContainers({ all: true });

    const containers = await Promise.all(
      allContainers.map(async (containerInfo) => {
        const container = docker.getContainer(containerInfo.Id);

        const stats = await container.stats({ stream: false });

        const inspectInfo = await container.inspect();

        return parseContainerData(containerInfo, stats, inspectInfo);
      })
    );

    return NextResponse.json({ containers });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

declare module 'dockerode' {
  interface ContainerInspectInfo {
    SizeRw?: number;
    SizeRootFs?: number;
  }
}

function parseContainerData(
  containerInfo: Dockerode.ContainerInfo,
  stats: Dockerode.ContainerStats,
  inspectInfo: Dockerode.ContainerInspectInfo
): EnhancedContainerInfo {
  const memoryUsage = stats.memory_stats.usage || 0;
  const memoryLimit = stats.memory_stats.limit || 1;
  const memoryPercent = ((memoryUsage / memoryLimit) * 100).toFixed(1);

  const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;
  const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
  const cpuCount = stats.cpu_stats.online_cpus || 1;
  const cpuPercent = parseFloat(((cpuDelta / systemDelta) * 100 * cpuCount).toFixed(1));

  const startTime = new Date(inspectInfo.State.StartedAt);
  const uptime = Date.now() - startTime.getTime();

  const diskSize =
    (inspectInfo?.SizeRw ?? inspectInfo?.SizeRootFs)
      ? `${((inspectInfo?.SizeRw || inspectInfo?.SizeRootFs || 0) / 1024 / 1024).toFixed(2)} MB`
      : 'N/A';

  return {
    id: containerInfo.Id,
    name: containerInfo.Names[0].replace(/^\//, ''),
    status: containerInfo.Status,
    running: containerInfo.State === 'running',
    memoryUsage: `${(memoryUsage / 1024 / 1024).toFixed(2)} MB (${memoryPercent}%)`,
    cpuPercent,
    uptime: formatUptime(uptime),
    diskSize,
  };
}

function formatUptime(ms: number): string {
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return `${days}d ${hours}h ${minutes}m`;
}
