export async function waitForVisible(locator, timeout = 5000) {
    await locator.waitFor({
      state: 'visible',
      timeout
    });
  }
  
  export async function waitForUrl(page, expectedUrl, timeout = 5000) {
    await page.waitForURL(expectedUrl, { timeout });
  }