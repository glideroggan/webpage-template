// Checks on the production build (run `npm run build` first) that every in-page link scrolls
// to its section: every menu link (clicked once, then again after scrolling up), the brand link,
// both hero buttons, and a direct /#contact load.
// The sections live in app-root's shadow root, so this guards against native anchors silently doing nothing.
// Needs Playwright's Chromium: `npx playwright install chromium`.
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { chromium } from 'playwright';

const DIST = path.resolve('dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.map': 'application/json' };

// Static server bound to loopback only, closed when the checks are done.
const server = http.createServer((req, res) => {
  const name = req.url === '/' || req.url.startsWith('/#') ? 'index.html' : path.basename(req.url.split('?')[0]);
  const file = path.join(DIST, name || 'index.html');
  if (!fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}/`;

const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${message}`);
  if (!ok) failures.push(message);
};

// Smooth scrolling animates, so wait until scrollY has not changed for a few frames.
const settle = (page) =>
  page.evaluate(
    () =>
      new Promise((resolve) => {
        let last = -1;
        let still = 0;
        const tick = () => {
          still = window.scrollY === last ? still + 1 : 0;
          last = window.scrollY;
          if (still >= 10) resolve(last);
          else requestAnimationFrame(tick);
        };
        tick();
      }),
  );

const targetState = (page, id) =>
  page.evaluate((targetId) => {
    const el = document.querySelector('app-root').shadowRoot.getElementById(targetId);
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
    return { found: !!el, top: el ? el.getBoundingClientRect().top : null, atBottom };
  }, id);

const landed = (state) => state.found && (state.atBottom || (state.top >= -1 && state.top <= 120));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
try {
  const open = async (hash = '') => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(url + hash, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => document.querySelector('app-root')?.shadowRoot?.querySelector('main'));
    await settle(page);
    return { context, page };
  };

  // The targets come from the rendered menu, so a section added to navLinks is checked too.
  const navTargets = await (async () => {
    const { context, page } = await open();
    const ids = await page
      .locator('app-root >> nav a[href^="#"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href').slice(1)));
    await context.close();
    return ids;
  })();
  check(navTargets.length > 0, `menu has in-page links (${navTargets.join(', ')})`);

  for (const id of navTargets) {
    const { context, page } = await open();
    const link = page.locator(`app-root >> nav a[href="#${id}"]`);
    const before = await page.evaluate(() => window.scrollY);
    await link.click();
    const after = await settle(page);
    check(after > before && landed(await targetState(page, id)), `nav link #${id} scrolls to the section`);

    // Clicking the link of the current hash again fires no hashchange; it must still scroll.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await settle(page);
    await link.click();
    const again = await settle(page);
    check(again > 0 && landed(await targetState(page, id)), `nav link #${id} scrolls again when clicked a second time`);
    await context.close();
  }

  for (const [selector, id] of [
    ['.button.primary', 'contact'],
    ['.button.secondary', 'services'],
  ]) {
    const { context, page } = await open();
    const before = await page.evaluate(() => window.scrollY);
    await page.locator(`hero-section >> ${selector}`).click();
    const after = await settle(page);
    check(after > before && landed(await targetState(page, id)), `hero button ${selector} scrolls to #${id}`);
    await context.close();
  }

  {
    const { context, page } = await open();
    await page.locator('app-root >> nav a[href="#contact"]').click();
    const down = await settle(page);
    await page.locator('app-root >> a.brand').click();
    const up = await settle(page);
    check(down > 0 && up < down, 'brand link (#top) scrolls back up');
    await context.close();
  }

  {
    const { context, page } = await open('#contact');
    const after = await settle(page);
    check(after > 0 && landed(await targetState(page, 'contact')), 'direct load of /#contact lands on the contact section');
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}

if (failures.length > 0) {
  console.error(`${failures.length} link check(s) failed`);
  process.exit(1);
}
console.log('all link checks passed');
