import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// ---------------------------------------------------------------------------
// Event Creation step definitions (TC_EVT_DMY_001)
//
// Reuses the shared login step from src/tests/steps/login.ts:
//   - Given user logs in using the configured credentials
// and the shared nav / Add-Event entry steps from src/tests/steps/test.ts:
//   - When user clicks on Events tab
//   - When user clicks on add new event button
//   - When user clicks on add event button
//
// The dummy data below is hard-coded from the JSON's dummyValues block
// (TC_EVT_DMY_001). All field values come straight from the test case so the
// step body is a direct, line-for-line rendering of the manual test steps.
// ---------------------------------------------------------------------------

When('user fills new Event form with dummy data', async function (this: CustomWorld) {
  const page = this.pageLocator.testPage;

  // Step 4 — title
  await page.eventTitle.fill('Acme Test Concert 2026');
  // Step 5 — description
  await page.eventDesc.fill('This is a dummy description for automated test case data.');
  // Step 6 — category. The live <select> options are plain strings
  // ("Conference", "Concert", "Sports", "Workshop", "Festival").
  await page.categoryDD.selectOption({ label: 'Concert' });
  // Step 7 — city
  await page.eventCity.fill('Dummyville');
  // Step 8 — venue
  await page.eventVenue.fill('Dummy Arena');
  // Step 9 — date (datetime-local input; the JSON date is 2027-06-15).
  // The live input expects the value in the format YYYY-MM-DDTHH:mm.
  await page.eventCalender.fill('2027-06-15T00:00');
  // Step 10 — price
  await page.eventPrice.fill('49.99');
  // Step 11 — seats
  await page.eventSeat.fill('100');
});

Then('the Event created success toast is visible', async function (this: CustomWorld) {
  // Step 13 — wait for the success toast 'Event created!' to appear.
  const toast = this.pageLocator.testPage.eventCreatedToast;
  await expect(toast).toBeVisible({ timeout: 15000 });
  await expect(toast).toContainText('Event created!');
});

Then('the new event appears in the listing', async function (this: CustomWorld) {
  // Step 14 — verify a new <article> card with the title 'Acme Test Concert 2026'
  // is visible in the events listing. The admin form lives on /admin/events
  // and adds the event to the global pool, so we navigate back to the public
  // /events listing before asserting.
  await this.page.goto(new URL('/events', this.page.url()).toString());
  const title = 'Acme Test Concert 2026';
  const cardWithTitle = this.pageLocator.testPage.eventCards
    .filter({ hasText: title })
    .first();
  await expect(cardWithTitle).toBeVisible({ timeout: 15000 });
});
