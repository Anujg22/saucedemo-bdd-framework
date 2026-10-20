
import { World, setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld extends World {
  constructor(options) {
    super(options);

    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;

    this.loginPage = undefined;
    this.productsPage = undefined;
    this.cartPage = undefined;
    this.checkoutPage = undefined;
  }
}

setWorldConstructor(CustomWorld);
