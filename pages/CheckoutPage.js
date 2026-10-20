
import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstName = page.getByRole('textbox', {
      name: 'First Name'
    });

    this.lastName = page.getByRole('textbox', {
      name: 'Last Name'
    });

    this.postalCode = page.getByRole('textbox', {
      name: 'Zip/Postal Code'
    });

    this.continueButton = page.getByRole('button', {
      name: 'Continue'
    });

    this.finishButton = page.getByRole('button', {
      name: 'Finish'
    });

    this.completeHeading = page.getByText(
      'Thank you for your order!',
      { exact: true }
    );
  }

  async fillCustomerDetails(customer) {
    await this.firstName.fill(customer.firstName);
    await this.lastName.fill(customer.lastName);
    await this.postalCode.fill(customer.postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();

    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html'
    );
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html'
    );

    await expect(this.completeHeading).toBeVisible();
  }
}
