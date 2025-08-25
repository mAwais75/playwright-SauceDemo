import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductsPage } from '../Pages/ProductsPage';

test('Add to Cart with Add/Remove Products Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  //Visitng the page with correct credentials and assertion to verify that we landed on the right page
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(productsPage.title).toHaveText('Products');

  //Add 4 products to the cart
  await productsPage.addToCartById('add-to-cart-sauce-labs-bike-light');
  await productsPage.addToCartById('add-to-cart-sauce-labs-onesie');
  await productsPage.addToCartById('add-to-cart-sauce-labs-bolt-t-shirt');
  await productsPage.addToCartById('add-to-cart-sauce-labs-backpack');

  //Assertion to verify cart is displaying 4 products
  await expect(productsPage.cartCount).toHaveText('4');

  //Remove two products from the cart
  await productsPage.removeFromCartById('remove-sauce-labs-backpack');
  await productsPage.removeFromCartById('remove-sauce-labs-onesie');

  //Assertion to verify that the cart is displaying the 2 products that is the correct behaviour
  await expect(productsPage.cartCount).toHaveText('2');
});
