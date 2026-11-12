// Screenshots of the production build (run `npm run build` first) at phone and desktop
// width, light and dark, into screens/.
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { chromium } from 'playwright';

const DIST = path.resolve('dist');
const OUT = path.resolve('screens');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.map': 'application/json' };

// Static server bound to loopback only, closed when the screenshots are done.
const server = http.createServer((req, res) => {
  const name = req.url === '/' ? 'index.html' : path.basename(req.url.split('?')[0]);
  const file = path.join(DIST, name);
  if (!fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}/`;

fs.mkdirSync(OUT, { recursive: true });
// Use whatever browser this machine has, so screenshots work without `npx playwright install`:
// Playwright's own Chromium, else Microsoft Edge, else the Chromium at CHROMIUM_PATH.
const launchBrowser = async () => {
  const options = [{}, { channel: 'msedge' }];
  if (process.env.CHROMIUM_PATH) options.push({ executablePath: process.env.CHROMIUM_PATH });
  const errors = [];
  for (const option of options) {
    try {
      return await chromium.launch(option);
    } catch (error) {
      errors.push(error.message.split('\n')[0]);
    }
  }
  throw new Error(`No browser found. Run \`npx playwright install chromium\`, install Edge or set CHROMIUM_PATH.\n${errors.join('\n')}`);
};

const browser = await launchBrowser();
try {
  for (const width of [375, 1280]) {
    for (const scheme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        colorScheme: scheme,
      });
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const file = path.join(OUT, `${width}-${scheme}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`wrote ${file}`);
      await context.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}
