import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductsPage } from '../Pages/ProductsPage';

test('Verify adding and removing items updates cart correctly', async ({ page }) => {
    // Step 1: Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Step 2: Perform login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 3: Verify user is navigated to Products Page
    const productsPage = new ProductsPage(page);
    await expect(productsPage.pageTitle).toHaveText('Products');

    // Step 4: Add a product to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Step 5: Verify cart badge count is updated
    await expect(productsPage.cartBadge).toHaveText('1');

    // Step 6: Navigate to cart page
    await productsPage.goToCart();

    // Step 7: Verify item is added correctly in the cart
    const cartPage = new CartPage(page);
    await expect(cartPage.getProductName()).toContain('Sauce Labs Backpack');

    // Step 8: Remove the product from cart
    await cartPage.removeProduct('Sauce Labs Backpack');

    // Step 9: Verify the cart is empty
    await expect(cartPage.cartItems).toHaveCount(0);
  });
