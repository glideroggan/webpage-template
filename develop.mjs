import * as esbuild from 'esbuild';
import * as fs from 'fs';

// Bound to loopback only: the dev server must not be reachable from the LAN.
const HOST = '127.0.0.1';
const PORT = 5080;

fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('index.html', 'dist/index.html');

// index.html is not bundled, so copy it on change; the reload below picks it up.
fs.watch('index.html', (eventType) => {
  if (eventType === 'change') {
    fs.copyFileSync('index.html', 'dist/index.html');
    console.log('[watch] Copied index.html');
  }
});

const ctx = await esbuild.context({
  entryPoints: ['src/main.ts'],
  bundle: true,
  sourcemap: true,
  outdir: 'dist',
  format: 'esm',
  target: 'es2021',
  // Theme files (src/themes/*.css) are imported as text and injected by src/themes/index.ts.
  loader: { '.css': 'text' },
  // Live reload: esbuild emits a "change" event on /esbuild after every rebuild. This
  // banner only exists in the dev bundle; build.mjs never adds it.
  banner: {
    js: "new EventSource('/esbuild').addEventListener('change', () => location.reload());",
  },
});

await ctx.watch();
await ctx.serve({ servedir: 'dist', host: HOST, port: PORT });

console.log(`[serve] Dev server with live reload at http://${HOST}:${PORT}`);
