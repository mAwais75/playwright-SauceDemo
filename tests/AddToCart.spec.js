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

  //Visitng the page with correct credentials and assertion to verify that we landed on the right page
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(productsPage.title).toHaveText('Products');

  //Selecting the and clicking the product i.e. Sauce Labs Fleece Jacket
  //Adding the product to the cart
  //Assertion to verify that the corresponding product has been added to the cart 
  await productsPage.openProduct('Sauce Labs Fleece Jacket');
  await productsPage.addToCartById('add-to-cart');
  await expect(page.locator('button[data-test="remove"]')).toHaveText('Remove');

  //Open the cart and assertion to verify the cart has been opened
  await productsPage.openCart();
  await expect(cartPage.title).toHaveText('Your Cart');
  
  //Assertion for the selected product name
  await expect(await cartPage.getProductName()).toHaveText('Sauce Labs Fleece Jacket');

  //Checkout and the corresponding assertion
  await cartPage.checkout();
  await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

  //Fill in the checkout information and the relevant assertion 
  await checkoutPage.fillInformation('Awais', 'Khalid', '51000');
  await expect(checkoutPage.title).toHaveText('Checkout: Overview');
  await expect(await checkoutPage.getProductName()).toHaveText('Sauce Labs Fleece Jacket');

  //Finish the order and assertion to verify that the order has been placed successfully 
  await checkoutPage.finishOrder();
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  await expect(checkoutPage.backHomeBtn).toHaveText('Back Home');
});