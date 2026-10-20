
import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.productsHeading = page.getByText('Products', {
      exact: true
    });

    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async expectProductsPage() {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );

    await expect(this.productsHeading).toBeVisible();
  }

  async addProductToCart(productName) {
    const product = this.page
      .locator('[data-test="inventory-item"]')
      .filter({
        has: this.page.getByText(productName, { exact: true })
      });

    await expect(product).toHaveCount(1);

    await product.getByRole('button', {
      name: 'Add to cart'
    }).click();
  }

  async expectCartBadge(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.cartLink.click();
  }
}
