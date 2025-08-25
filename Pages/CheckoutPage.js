export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeBtn = page.locator('#back-to-products');

    // 🔹 Add locator for product in checkout overview
    this.productName = page.locator('[data-test="inventory-item-name"]');
  }

  async fillInformation(first, last, postal) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    await this.continueBtn.click();
  }

  async getProductName() {
    return this.productName;   
  }

  async finishOrder() {
    await this.finishBtn.click();
  }
}
