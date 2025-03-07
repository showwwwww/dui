import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { parseArgs } from './utils.mjs';

// Define the path to your package.json file
const packageJsonPath = path.resolve(process.cwd(), 'package.json');

// Read and parse the package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Split the commands by '&&' and trim each command
const commands = packageJson.scripts.scripts.split('&&').map((command) => command.trim());

const watcherPaths = commands
  .map((command) => {
    const { sourceDir } = parseArgs(command.split(' '));
    return typeof sourceDir === 'string' ? path.resolve(process.cwd(), sourceDir) : null;
  })
  .filter((sourceDir) => sourceDir !== null);

let watcher = null;
let isProcessing = false;

const initWatcher = () => {
  return chokidar.watch(watcherPaths, {
    ignored: [
      /(^|[/\\])\../,
      ...watcherPaths.map((path) => `${path}/index.ts`.replace(/\\/g, '/')),
    ],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },
  });
};

const handleFileChange = async (filePath) => {
  if (isProcessing) return;
  isProcessing = true;

  // destroy watcher
  if (watcher) {
    await watcher.close();
    watcher = null;
  }

  console.log(`🔄 Detected change: ${filePath}`);
  exec('npm run scripts', async (err, stdout) => {
    if (err) {
      console.error('❌ Script error:', err);
    }

    console.log('✅ Script output:', stdout);

    watcher = initWatcher();
    bindListeners();
    isProcessing = false;
  });
};

const bindListeners = () => {
  watcher
    .on('ready', () => console.log('👀 Watching for file changes...'))
    .on('add', handleFileChange)
    .on('unlink', handleFileChange)
    .on('change', handleFileChange)
    .on('error', (err) => console.error('🔥 Watching error:', err));
};

watcher = initWatcher();
bindListeners();
