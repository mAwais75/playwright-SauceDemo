import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage'
import { ProductsPage } from '../Pages/ProductsPage'
import { CartPage } from '../Pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage';

test('Add to Cart with Complete Checkout Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(productsPage.title).toHaveText('Products');

  await productsPage.openProduct('Sauce Labs Fleece Jacket');
  await productsPage.addToCartById('add-to-cart');
  await expect(page.locator('button[data-test="remove"]')).toHaveText('Remove');

  await productsPage.openCart();
  await expect(cartPage.title).toHaveText('Your Cart');
  
  
  await expect(await cartPage.getProductName()).toHaveText('Sauce Labs Fleece Jacket');

  await cartPage.checkout();
  await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

  await checkoutPage.fillInformation('Awais', 'Khalid', '51000');
  await expect(checkoutPage.title).toHaveText('Checkout: Overview');
  await expect(await checkoutPage.getProductName()).toHaveText('Sauce Labs Fleece Jacket');

  await checkoutPage.finishOrder();
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  await expect(checkoutPage.backHomeBtn).toHaveText('Back Home');
});