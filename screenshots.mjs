// Screenshots of the production build (run `npm run build` first) into screens/, named
// <theme>-<width>-<mode>.png: every theme at phone and desktop width, in each mode it supports.
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { chromium } from 'playwright';

const DIST = path.resolve('dist');
const OUT = path.resolve('screens');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.map': 'application/json' };

// Timesheet follows the system setting; the other themes have one mode each.
const SHOTS = [
  ['timesheet', 'light'],
  ['timesheet', 'dark'],
  ['vykort', 'light'],
  ['redaktionell', 'light'],
  ['pipeline', 'dark'],
  ['gladje', 'light'],
];

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
  for (const [theme, scheme] of SHOTS) {
    for (const width of [375, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
      // The page reads the theme from localStorage on start, as after a visitor's own pick.
      await context.addInitScript((name) => localStorage.setItem('theme', name), theme);
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'load' });
      await page.waitForFunction(
        (name) =>
          name === 'timesheet'
            ? !document.documentElement.hasAttribute('data-theme')
            : document.documentElement.getAttribute('data-theme') === name &&
              document.querySelector(`style[data-theme-styles="${name}"]`) !== null,
        theme,
        { timeout: 5000 },
      );
      // The theme's font @import starts only once its CSS is injected, so let it finish first.
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      const file = path.join(OUT, `${theme}-${width}-${scheme}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`wrote ${file}`);
      await context.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}
