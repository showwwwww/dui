import { fileURLToPath } from "url";

export const parseArgs = (command) => {
  let sourceDir = null;
  let outputDir = null;

  for (let index = 0; index < command.length; index++) {
    const arg = command[index];
    if (arg === '--source') {
      sourceDir = command[++index];
    }
    if (arg === '--output') {
      outputDir = command[++index];
    }
  }
  if (typeof sourceDir !== 'string' || typeof outputDir !== 'string') {
    throw new Error(`${fileURLToPath(import.meta.url)}
    sourceDir and outputDir are required`);
  }
  return { sourceDir, outputDir };
};
