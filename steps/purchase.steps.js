
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const users = JSON.parse(
  await readFile(
    path.join(currentDir, '../testdata/users.json'),
    'utf8'
  )
);

const checkoutData = JSON.parse(
  await readFile(
    path.join(currentDir, '../testdata/checkout.json'),
    'utf8'
  )
);

import { config } from '../config/config.js';
import { logger } from '../support/logger.js';

Given('I login as a standard user', async function () {
  await this.loginPage.open(config.baseUrl);

  const { username, password } = users.standardUser;

  await this.loginPage.login(username, password);

  await this.productsPage.expectProductsPage();

  logger.info('Standard user login successful');
});

Then('I should see the products page', async function () {
  await this.productsPage.expectProductsPage();
});

When('I add {string} to the cart', async function (productName) {
  await this.productsPage.addProductToCart(productName);
});

Then('the cart badge should show {string}', async function (count) {
  await this.productsPage.expectCartBadge(count);
});

When('I open the shopping cart', async function () {
  await this.productsPage.openCart();
});

Then('I should see {string} in the cart', async function (productName) {
  await this.cartPage.expectProductInCart(productName);
});

When('I checkout with valid customer details', async function () {
  await this.cartPage.checkout();

  await expect(this.page).toHaveURL(
    'https://www.saucedemo.com/checkout-step-one.html'
  );

  await this.checkoutPage.fillCustomerDetails(
    checkoutData.validCustomer
  );

  await this.checkoutPage.continueToOverview();
  await this.checkoutPage.finishOrder();
});

Then('I should see the order confirmation page', async function () {
  await this.checkoutPage.expectOrderComplete();
});

Given('I attempt login with invalid credentials', async function () {
  await this.loginPage.open(config.baseUrl);

  const { username, password } = users.invalidUser;

  await this.loginPage.login(username, password);
});

Then('I should see an authentication error message', async function () {
  const message = await this.loginPage.getErrorMessage();

  expect(message).toContain(
    'Username and password do not match'
  );
});

Then('I should remain on the login page', async function () {
  await this.loginPage.expectLoginPage();
});
