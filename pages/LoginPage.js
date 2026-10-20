
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', {
      name: 'Username'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    this.loginButton = page.getByRole('button', {
      name: 'Login'
    });

    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open(baseUrl) {
    await this.page.goto(baseUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
    return (await this.errorMessage.innerText()).trim();
  }

  async expectLoginPage() {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/'
    );

    await expect(this.loginButton).toBeVisible();
  }
}
