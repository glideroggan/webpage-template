// The themes the header select offers, in this order. A theme is one CSS file next to this one,
// src/themes/<name>.css, whose rules all sit under :root[data-theme="<name>"]; adding a theme is that
// file plus one line here. The default lives in index.html and has no file.
export interface Theme {
  name: string;
  label: string;
}

export const defaultTheme = 'timesheet';

export const themes: Theme[] = [
  { name: defaultTheme, label: 'Timesheet' },
  { name: 'vykort', label: 'Vykort' },
  { name: 'redaktionell', label: 'Redaktionell' },
  { name: 'pipeline', label: 'Pipeline' },
  { name: 'gladje', label: 'Glädje' },
];

const STORAGE_KEY = 'theme';
const STYLE_ATTRIBUTE = 'data-theme-styles';

// Only names from the list above are ever used, so a stored value cannot pick an arbitrary file.
const known = (name: string | null): name is string => themes.some((theme) => theme.name === name);

export function storedTheme(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return known(stored) ? stored : defaultTheme;
  } catch {
    // Storage can be blocked (private mode, strict cookie settings): show the default.
    return defaultTheme;
  }
}

// Bumped on every call, so a slow load for an earlier pick never overrides a later one.
let latest = 0;

// Shows a theme: injects only its CSS, sets data-theme on <html> (none for the default) and
// remembers the pick. Resolves to the theme actually shown, or null when a later call took over.
export async function applyTheme(name: string): Promise<string | null> {
  const call = ++latest;
  const wanted = known(name) ? name : defaultTheme;
  let css = '';
  if (wanted !== defaultTheme) {
    try {
      // esbuild bundles every src/themes/*.css as text for this import (see the loader in build.mjs).
      css = (await import(`./${wanted}.css`)).default;
    } catch (error) {
      console.error(`Theme "${wanted}" could not be loaded; showing ${defaultTheme}.`, error);
      return call === latest ? applyTheme(defaultTheme) : null;
    }
  }
  if (call !== latest) return null;

  document.querySelectorAll(`style[${STYLE_ATTRIBUTE}]`).forEach((style) => style.remove());
  if (wanted === defaultTheme) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    const style = document.createElement('style');
    style.setAttribute(STYLE_ATTRIBUTE, wanted);
    style.textContent = css;
    document.head.append(style);
    document.documentElement.setAttribute('data-theme', wanted);
  }

  try {
    localStorage.setItem(STORAGE_KEY, wanted);
  } catch {
    // Not remembered, but the theme is shown for this visit.
  }
  return wanted;
}
