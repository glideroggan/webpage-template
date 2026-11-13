// Checks on the production build (run `npm run build` first):
// - links: every menu link (clicked once, then again after scrolling away), the brand link and a
//   direct /#exempel load land on their target. The page lives in app-root's shadow root, so this
//   guards against native anchors silently doing nothing.
// - themes: picking each theme in the header select changes the page background, the header and the
//   kit's primary button, and the choice survives a reload. A page whose theme CSS never arrives
//   must fail that check, so the check itself is tested too.
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { chromium } from 'playwright';

const DIST = path.resolve('dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.map': 'application/json' };

// The themes the header select must offer, in this order; the first is the default.
const THEMES = ['timesheet', 'vykort', 'redaktionell', 'pipeline', 'gladje'];
const DEFAULT_THEME = THEMES[0];

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

const scrollToBottom = async (page) => {
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  return settle(page);
};

// Use whatever browser this machine has, so the check runs without `npx playwright install`:
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

const rendered = (page) =>
  page.waitForFunction(() => document.querySelector('app-root')?.shadowRoot?.querySelector('main'), null, { timeout: 5000 });

// What a theme visibly changes, read from the rendered page.
const readLook = (page) =>
  page.evaluate(() => {
    const root = document.querySelector('app-root')?.shadowRoot;
    const header = root?.querySelector('header');
    const button = root?.querySelector('kit-section')?.shadowRoot?.querySelector('.button.primary');
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      injected: [...document.querySelectorAll('style[data-theme-styles]')].map((s) => s.getAttribute('data-theme-styles')),
      options: [...(root?.querySelectorAll('select option') ?? [])].map((o) => o.value),
      selected: root?.querySelector('select')?.value ?? null,
      background: getComputedStyle(document.body).backgroundColor,
      header: header ? getComputedStyle(header).backgroundColor : null,
      button: button ? getComputedStyle(button).backgroundColor : null,
    };
  });

// True when the page shows `name`: the default has no data-theme and nothing injected and looks like
// `base`; any other theme is the only injected stylesheet and changes all three colours.
const showsTheme = (look, base, name) => {
  if (look.selected !== name || look.header === null || look.button === null) return false;
  if (name === DEFAULT_THEME) {
    return (
      look.theme === null &&
      look.injected.length === 0 &&
      look.background === base.background &&
      look.header === base.header &&
      look.button === base.button
    );
  }
  return (
    look.theme === name &&
    look.injected.length === 1 &&
    look.injected[0] === name &&
    look.background !== base.background &&
    look.header !== base.header &&
    look.button !== base.button
  );
};

// The theme CSS loads asynchronously, so poll for a while before judging.
const waitForTheme = async (page, base, name) => {
  let look = await readLook(page);
  for (let i = 0; i < 30 && !showsTheme(look, base, name); i++) {
    await page.waitForTimeout(100);
    look = await readLook(page);
  }
  return look;
};

const browser = await launchBrowser();
try {
  // A short viewport, so the page scrolls and each link has somewhere to scroll from.
  const open = async (hash = '', options = {}) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 360 }, ...options });
    const page = await context.newPage();
    await page.goto(url + hash, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await rendered(page);
    await settle(page);
    return { context, page };
  };

  // The targets come from the rendered menu, so a link added to navLinks is checked too.
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
    const before = await scrollToBottom(page);
    await link.click();
    const after = await settle(page);
    check(before > 0 && after !== before && landed(await targetState(page, id)), `nav link #${id} scrolls to its target`);

    // Clicking the link of the current hash again fires no hashchange; it must still scroll.
    const away = await scrollToBottom(page);
    await link.click();
    const again = await settle(page);
    check(away > 0 && again !== away && landed(await targetState(page, id)), `nav link #${id} scrolls again when clicked a second time`);
    await context.close();
  }

  {
    const { context, page } = await open();
    const down = await scrollToBottom(page);
    await page.locator('app-root >> a.brand').click();
    const up = await settle(page);
    check(down > 0 && up < down, 'brand link (#top) scrolls back up');
    await context.close();
  }

  {
    const target = navTargets[0] ?? 'exempel';
    const { context, page } = await open(`#${target}`);
    check(landed(await targetState(page, target)), `direct load of /#${target} lands on its target`);
    await context.close();
  }

  for (const colorScheme of ['light', 'dark']) {
    const { context, page } = await open('', { colorScheme });
    const base = await readLook(page);
    check(
      JSON.stringify(base.options) === JSON.stringify(THEMES),
      `${colorScheme}: the theme select offers ${THEMES.join(', ')} (found ${base.options.join(', ') || 'none'})`,
    );
    check(showsTheme(base, base, DEFAULT_THEME), `${colorScheme}: a first visit shows ${DEFAULT_THEME}`);
    await context.close();

    // Each theme from a fresh visit, then the default again from a page that had another theme.
    for (const name of [...THEMES.slice(1), DEFAULT_THEME]) {
      const { context, page } = await open('', { colorScheme });
      if (name === DEFAULT_THEME) {
        await page.locator('app-root >> select').selectOption(THEMES[1]);
        await waitForTheme(page, base, THEMES[1]);
      }
      await page.locator('app-root >> select').selectOption(name);
      const picked = await waitForTheme(page, base, name);
      check(showsTheme(picked, base, name), `${colorScheme}: picking ${name} changes background, header and kit button (${JSON.stringify(picked)})`);

      await page.reload({ waitUntil: 'load' });
      await rendered(page);
      const reloaded = await waitForTheme(page, base, name);
      check(showsTheme(reloaded, base, name), `${colorScheme}: ${name} is still shown after a reload (${JSON.stringify(reloaded)})`);
      await context.close();
    }
  }

  {
    // A theme whose stylesheet never reaches the page must not pass the check above.
    const { context, page } = await open();
    const base = await readLook(page);
    await page.evaluate(() => {
      new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (node instanceof HTMLStyleElement && node.hasAttribute('data-theme-styles')) node.remove();
          }
        }
      }).observe(document.documentElement, { childList: true, subtree: true });
    });
    await page.locator('app-root >> select').selectOption(THEMES[1]);
    const broken = await waitForTheme(page, base, THEMES[1]);
    check(!showsTheme(broken, base, THEMES[1]), 'the theme check fails when the theme CSS is not injected');
    await context.close();
  }

  {
    // A stored value that is not a theme falls back to the default instead of loading anything.
    const context = await browser.newContext({ viewport: { width: 1280, height: 360 } });
    await context.addInitScript(() => localStorage.setItem('theme', '../not-a-theme'));
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await rendered(page);
    const look = await readLook(page);
    check(look.theme === null && look.injected.length === 0 && look.selected === DEFAULT_THEME, `an unknown stored theme falls back to ${DEFAULT_THEME}`);
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}

if (failures.length > 0) {
  console.error(`${failures.length} check(s) failed`);
  process.exit(1);
}
console.log('all checks passed');
