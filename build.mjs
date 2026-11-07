import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

fs.mkdirSync('dist', { recursive: true });

const result = await esbuild.build({
  entryPoints: ['src/main.ts'],
  entryNames: '[name]-[hash]',
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: 'dist',
  format: 'esm',
  target: 'es2021',
  metafile: true,
});

// The entry is hashed so browsers never reuse a stale cached bundle; find its emitted
// name so index.html can be pointed at it.
const [mainOutputPath] = Object.entries(result.metafile.outputs).find(
  ([, output]) => output.entryPoint === 'src/main.ts'
);
const mainFileName = path.basename(mainOutputPath);

const indexHtml = fs.readFileSync('index.html', 'utf8').replace('./main.js', `./${mainFileName}`);
fs.writeFileSync('dist/index.html', indexHtml);

console.log(`Build complete: dist/${mainFileName}`);
