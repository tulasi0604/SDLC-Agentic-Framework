import { cp, mkdir, readFile, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/src', { recursive: true });

const source = await readFile('src/main.js', 'utf8');
new Function(source);

await Promise.all([
  cp('index.html', 'dist/index.html'),
  cp('src/main.js', 'dist/src/main.js'),
  cp('src/styles.css', 'dist/src/styles.css'),
]);

console.log('Production files written to dist/.');
