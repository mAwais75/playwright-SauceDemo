import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage'
import { ProductsPage } from '../Pages/ProductsPage'
import { CartPage } from '../Pages/CartPage'
import { CheckoutPage } from '../Pages/CheckoutPage';

test('Add to Cart with Complete Checkout Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(productsPage.title).toHaveText('Products');

  // Add products
  await productsPage.addToCartById('add-to-cart-sauce-labs-bike-light');
  await productsPage.addToCartById('add-to-cart-sauce-labs-onesie');

  // Verify cart count
  await expect(productsPage.cartCount).toHaveText('2');

  // Go to cart
  await productsPage.openCart();
  const cartProducts = await cartPage.getProductName().allTextContents();
  expect(cartProducts).toContain('Sauce Labs Bike Light');
  expect(cartProducts).toContain('Sauce Labs Onesie');

  // Checkout
  await cartPage.checkout();
  await checkoutPage.fillInformation('John', 'Doe', '12345');

  // Verify products in checkout overview
  const checkoutProducts = await checkoutPage.getProductName().allTextContents();
  expect(checkoutProducts).toContain('Sauce Labs Bike Light');
  expect(checkoutProducts).toContain('Sauce Labs Onesie');

  // Finish order
  await checkoutPage.finishOrder();
  await expect(checkoutPage.completeHeader).toHaveText('THANK YOU FOR YOUR ORDER');
});