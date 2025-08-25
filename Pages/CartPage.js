export class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('#checkout');
  }

  // Instead of using expect here, just return the locator
  async getProductName() {
    return this.productName;
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
