import { test, expect } from '@playwright/test';
import loginData from '../test-data/loginData.json';  // Import test data
import {LoginPage} from '../Pages/LoginPage'; 
import {ProductsPage} from '../Pages/ProductsPage';

test.describe('Login Feature - DDT', () => {
  for (const data of loginData) {
    test(`Login test for ${data.username} expecting: ${data.expected}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto();
      await loginPage.login(data.username, data.password);

      if (data.expected === 'success') {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(productsPage.title).toHaveText('Products');
      } else if (data.expected === 'locked') {
        await expect(await loginPage.getErrorMessage()).toHaveText(
          'Epic sadface: Sorry, this user has been locked out.'
        );
      } else if (data.expected === 'invalid') {
        await expect(await loginPage.getErrorMessage()).toHaveText(
          'Epic sadface: Username and password do not match any user in this service'
        );
      }
    });
  }
});