import { readdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { parseArgs } from './utils.mjs';

try {
  const { sourceDir, outputDir } = parseArgs(process.argv);
  const pluginFiles = readdirSync(sourceDir).filter(
    (file) => file.endsWith('.ts') && file !== 'index.ts'
  );

  const pluginImports = pluginFiles
    .map(
      (file) => `import plugin_${file.replace(/\.ts$/, '')} from './${file.replace(/\.ts$/, '')}';`
    )
    .join('\n');

  const pluginArray = pluginFiles.map((file) => `plugin_${file.replace(/\.ts$/, '')}`).join(', ');

  const outputContent = `${pluginImports}
  
const plugins: MWPlugin[] = [${pluginArray}];
  
export default plugins;
`;

  writeFileSync(resolve(outputDir, 'index.ts'), outputContent);
} catch (error) {
  console.error(error);
}
