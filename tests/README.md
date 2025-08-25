# Playwright Test Automation – SauceDemo

This project contains automated test cases for the [SauceDemo Web Application](https://www.saucedemo.com/) using **Playwright** with **JavaScript** and **Page Object Model (POM)** structure.

---

## 📌 Test Scenarios Covered
- ✅ **Login Tests**
  - Valid login Scenarios
  - Invalid login Scenarios (wrong credentials) – Data Driven (DDT)
- ✅ **Add to Cart Tests**
  - Add products to cart
  - Remove products from cart
  - Verify cart updates accordingly
- ✅ **Checkout Process**
  - Fill checkout form
  - Verify product details in checkout overview
  - Confirm order successfully

---

## 🛠 Tech Stack
- [Playwright](https://playwright.dev/) – Test automation framework
- **JavaScript (Node.js)** – Programming Language
- **Page Object Model (POM)** – Design pattern for maintainability
- **Monocart Reporter** – Test execution report
- **GitHub Actions** – CI/CD pipeline (runs tests on push/PR)

---

## 📂 Project Structure

📦 AutomationAssignment
 ┣ 📂 tests                           # Test specs
 ┃ ┣ 📜 AddToCartAddRemove.spec.js
 ┃ ┣ 📜 LoginWithDDT.spec.js
 ┃ ┗ 📜 Checkout.spec.js
 ┣ 📂 Pages                           # Page Object Model classes
 ┃ ┣ 📜 LoginPage.js
 ┃ ┣ 📜 ProductsPage.js
 ┃ ┣ 📜 CartPage.js
 ┃ ┗ 📜 CheckoutPage.js
 ┣ 📂 reports                         # Project dependencies
 ┣ 📜 package.json
 ┣ 📜 playwright.config.js            # Playwright test runner config
 ┣ 📜 README.md                       # Documentation

## ⚙️ Setup Instructions

Follow these steps if you want to clone and set up this repo locally:

1. Clone the repository
git clone <your-repo-url>
cd <repo-folder>

2. Install dependencies
npm install

3. Install Playwright browsers
npx playwright install

## Run Tets

1. Run all tests
npx playwright test

2. Run tests for a specific browser
npx playwright test --project chromium
npx playwright test --project firefox
npx playwright test --project webkit

3. Run a specific test file
npx playwright test tests/LoginWithDDT.spec.js

## Reports

1. Monocart Report
monocart-report/index.html

2. HTML Report
playwright-report/index.html

Note: Reports are also uploaded as artifacts in GitHub Actions when CI/CD workflow runs.


## 📌 Features

✅ User Login – Valid & invalid credentials (Data-Driven Testing)
✅ Product Add/Remove – Verify cart updates
✅ Checkout Flow – End-to-end order confirmation (without payment)
✅ Assertions – Validations at each step
✅ Page Object Model (POM) – Clean, maintainable code
✅ Reports – Monocart for rich HTML test reports
✅ CI/CD Ready – GitHub Actions integration included

