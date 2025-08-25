export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartIcon = page.locator('#shopping_cart_container');
    this.cartCount = page.locator('[data-test="shopping-cart-badge"]');
  }

  async isLoaded() {
    await this.title.waitFor();
  }

  async openProduct(name) {
    await this.page.locator(`a:has-text("${name}")`).click();
  }

  async addToCartById(id) {
    await this.page.locator(`#${id}`).click();
  }

  async removeFromCartById(id) {
    await this.page.locator(`#${id}`).click();
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
