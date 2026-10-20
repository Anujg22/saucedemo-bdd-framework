
import {
    Before,
    After,
    BeforeAll,
    AfterAll,
    Status
  } from '@cucumber/cucumber';
  
  import fs from 'node:fs/promises';
  import path from 'node:path';
  
  import { createBrowser, createContext } from './browser.js';
  import { logger } from './logger.js';
  import { config } from '../config/config.js';
  
  import { LoginPage } from '../pages/LoginPage.js';
  import { ProductsPage } from '../pages/ProductsPage.js';
  import { CartPage } from '../pages/CartPage.js';
  import { CheckoutPage } from '../pages/CheckoutPage.js';
  
  let browser;
  
  BeforeAll(async function () {
    browser = await createBrowser();
    logger.info(`Browser started: ${config.browserName}`);
  });
  
  Before(async function () {
    this.browser = browser;
    this.context = await createContext(browser);
    this.page = await this.context.newPage();
  
    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
  
    logger.info('Scenario started');
  });
  
  After(async function (scenario) {
    try {
      if (
        scenario.result?.status === Status.FAILED &&
        this.page &&
        !this.page.isClosed()
      ) {
        const screenshot = await this.page.screenshot({
          fullPage: true
        });
  
        await this.attach(screenshot, 'image/png');
  
        const screenshotDir = path.resolve('artifacts/screenshots');
        await fs.mkdir(screenshotDir, { recursive: true });
  
        const safeName = scenario.pickle.name
          .replace(/[^a-z0-9-_]/gi, '_')
          .slice(0, 100);
  
        await fs.writeFile(
          path.join(screenshotDir, `${safeName}.png`),
          screenshot
        );
  
        logger.error(`Scenario failed: ${scenario.pickle.name}`);
      }
    } finally {
      await this.context?.close();
      logger.info(`Scenario finished: ${scenario.pickle.name}`);
    }
  });
  
  AfterAll(async function () {
    await browser?.close();
    logger.info('Browser closed');
  });
  