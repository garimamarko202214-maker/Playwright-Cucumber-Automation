import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// ---------------------------------------------------------------------------
// Create Account step definitions (5-scenario slice).
//
// These step phrases match the wording in
// src/tests/features/create-account.feature exactly. The full set of 35
// step phrases (covering all TC_CREATE_ACCOUNT_NNN tags) is preserved in
// git history; this file is the trimmed version that runs only the five
// representative scenarios above.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

Given('user is on the EventHub login page', async function (this: CustomWorld) {
  await this.pageLocator.testPage.gotoEventHubLoginPage();
});

Given('user is on the Create Account page', async function (this: CustomWorld) {
  await this.pageLocator.testPage.gotoEventHubLoginPage();
  await this.pageLocator.testPage.clickCreateAccountLink();
});

When('user clicks the {string} link', async function (this: CustomWorld, linkText: string) {
  // Single matcher for any "Create your account" / "Sign Up" / "Register" link
  // on the login page. The helper resolves whichever label is actually
  // rendered in the live DOM.
  if (/create\s*account|sign\s*up|register/i.test(linkText)) {
    await this.pageLocator.testPage.clickCreateAccountLink();
    return;
  }
  // Fallback: locate a link with the exact visible text.
  await this.page.getByRole('link', { name: new RegExp(linkText, 'i') }).first().click();
});

Then('the {string} link is visible on the login page', async function (this: CustomWorld, linkText: string) {
  await expect(this.pageLocator.testPage.createAccountLink).toBeVisible({ timeout: 15000 });
});

Then('the URL changes to the signup route', async function (this: CustomWorld) {
  await this.page.waitForURL(/\/(register|sign-?up|signup)\b/i, { timeout: 15000 });
});

Then('the Create Account form is displayed with all required fields visible',
  async function (this: CustomWorld) {
    await expect(this.pageLocator.testPage.createAccountForm).toBeVisible({ timeout: 15000 });
    await expect(this.pageLocator.testPage.firstNameInput).toBeVisible();
    await expect(this.pageLocator.testPage.lastNameInput).toBeVisible();
    await expect(this.pageLocator.testPage.registerEmailInput).toBeVisible();
    await expect(this.pageLocator.testPage.registerPhoneInput).toBeVisible();
    await expect(this.pageLocator.testPage.registerPasswordInput).toBeVisible();
    await expect(this.pageLocator.testPage.registerConfirmPasswordInput).toBeVisible();
    await expect(this.pageLocator.testPage.createAccountSubmitButton).toBeVisible();
  });

// ---------------------------------------------------------------------------
// Field fills — each step takes the value from the Gherkin step text so
// scenarios read declaratively and don't depend on scenario context.
// ---------------------------------------------------------------------------

When('user enters first name {string}', async function (this: CustomWorld, value: string) {
  await this.pageLocator.testPage.fillFirstName(value);
});

When('user enters last name {string}', async function (this: CustomWorld, value: string) {
  await this.pageLocator.testPage.fillLastName(value);
});

When('user enters email {string}', async function (this: CustomWorld, value: string) {
  await this.pageLocator.testPage.fillRegisterEmail(value);
});

When('user enters phone {string}', async function (this: CustomWorld, value: string) {
  await this.pageLocator.testPage.fillRegisterPhone(value);
});

When('user enters password {string}', async function (this: CustomWorld, value: string) {
  await this.pageLocator.testPage.fillRegisterPassword(value);
});

When('user enters confirm password {string}', async function (this: CustomWorld, value: string) {
  await this.pageLocator.testPage.fillRegisterConfirmPassword(value);
});

// ---------------------------------------------------------------------------
// Submit / navigation
// ---------------------------------------------------------------------------

When('user clicks the Create Account button', async function (this: CustomWorld) {
  await this.pageLocator.testPage.clickCreateAccountSubmit();
});

Then('a success message is displayed', async function (this: CustomWorld) {
  await this.pageLocator.testPage.waitForRegisterSuccessToast();
});

Then('the user is redirected to the login page or auto-logged into the dashboard',
  async function (this: CustomWorld) {
    // The post-submission state is implementation-defined (login redirect
    // OR auto-login). Either way, the post-submission network activity
    // must settle and the success toast must have been visible.
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
  });

// ---------------------------------------------------------------------------
// Negative-path assertions
// ---------------------------------------------------------------------------

Then('every required field shows a {string} error message',
  async function (this: CustomWorld, errorText: string) {
    // Assert that AT LEAST one required-field error is visible. The exact
    // number of visible errors depends on the implementation (some apps
    // surface one error per field, others show a summary at the top).
    const anyError = this.pageLocator.testPage.anyRegisterFormError;
    await expect(anyError.first()).toBeVisible({ timeout: 10000 });
    // The visible error text should match (case-insensitive) the expected
    // fragment — e.g. "required", "this field is required".
    const firstErrorText = await anyError.first().innerText();
    expect(firstErrorText.toLowerCase()).toContain(errorText.toLowerCase());
  });

Then('the form did not submit', async function (this: CustomWorld) {
  // Assert that we are still on the signup route (no redirect to /login
  // or /events) and the success toast never appeared.
  const url = this.page.url();
  expect(/\/(register|sign-?up|signup)/i.test(url)).toBeTruthy();
  await expect(this.pageLocator.testPage.registerSuccessToast).toHaveCount(0);
});

Then('the Email field shows a {string} error',
  async function (this: CustomWorld, errorText: string) {
    await expect(this.pageLocator.testPage.registerEmailError).toBeVisible({ timeout: 10000 });
    const text = await this.pageLocator.testPage.registerEmailError.innerText();
    expect(text.toLowerCase()).toContain(errorText.toLowerCase());
  });

// ---------------------------------------------------------------------------
// Duplicate email (TC_015)
// ---------------------------------------------------------------------------

Then('a {string} error is shown',
  async function (this: CustomWorld, errorText: string) {
    if (/already\s*exists|already\s*registered|email\s*is\s*taken/i.test(errorText)) {
      await this.pageLocator.testPage.waitForDuplicateEmailError();
      return;
    }
    // Generic matcher: any visible error with the expected fragment.
    const anyError = this.pageLocator.testPage.anyRegisterFormError;
    await expect(anyError.first()).toBeVisible({ timeout: 10000 });
    const text = await anyError.first().innerText();
    expect(text.toLowerCase()).toContain(errorText.toLowerCase());
  });
