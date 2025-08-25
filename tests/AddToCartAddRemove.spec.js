import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductsPage } from '../Pages/ProductsPage';

test('Add to Cart with Add/Remove Products Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(productsPage.title).toHaveText('Products');

  await productsPage.addToCartById('add-to-cart-sauce-labs-bike-light');
  await productsPage.addToCartById('add-to-cart-sauce-labs-onesie');
  await productsPage.addToCartById('add-to-cart-sauce-labs-bolt-t-shirt');
  await productsPage.addToCartById('add-to-cart-sauce-labs-backpack');

  await expect(productsPage.cartCount).toHaveText('4');

  await productsPage.removeFromCartById('remove-sauce-labs-backpack');
  await productsPage.removeFromCartById('remove-sauce-labs-onesie');

  await expect(productsPage.cartCount).toHaveText('2');
});
