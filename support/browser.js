
import { chromium, firefox, webkit } from 'playwright';
import { config } from '../config/config.js';

const browserTypes = {
  chromium,
  firefox,
  webkit
};

export async function createBrowser() {
  const browserType = browserTypes[config.browserName];

  return browserType.launch({
    headless: config.headless,
    slowMo: config.slowMo
  });
}

export async function createContext(browser) {
  return browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: false
  });
}
