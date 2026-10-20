
import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;

    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout'
    });
  }

  async expectProductInCart(productName) {
    await expect(
      this.page.getByText(productName, { exact: true })
    ).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
