import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// ---------------------------------------------------------------------------
// Book Event step definitions (TC_BKG_DMY_001)
//
// Reuses the shared login + nav step phrases:
//   - Given user logs in using the configured credentials (src/tests/steps/login.ts)
//   - And   user clicks on Events tab                  (src/tests/steps/test.ts)
//
// Dummy data below is hard-coded from the JSON's dummyValues block
// (TC_BKG_DMY_001). All field values come straight from the test case so the
// step body is a direct, line-for-line rendering of the manual test steps.
// ---------------------------------------------------------------------------

const DUMMY_EVENT_TITLE = 'Acme Test Concert 2026';
const DUMMY_BOOKING = {
  seats: 2,
  name: 'Acme Test Booker',
  email: 'booker.dummy@acme-test.com',
  phone: '+1-555-0100',
  card: '4111 1111 1111 1111',
  expiry: '12/29',
  cvv: '123',
} as const;

// Capture the initial available-seats count for the dummy event so the
// post-booking assertion can compare against it. Stored on the world so
// other steps in the same scenario can read it.
When(
  "the user locates the event card for {string} and captures the initial available seats",
  async function (this: CustomWorld, title: string) {
    const tp = this.pageLocator.testPage;

    // Find the event card whose <h3> title matches the supplied string.
    const card = tp.eventCards
      .filter({ has: tp.page.locator('h3', { hasText: new RegExp(`^\\s*${title}\\s*$`, 'i') }) })
      .first();
    await expect(card).toBeVisible({ timeout: 15000 });

    // Read the seats text from the availableSeatsLabel scoped to this card.
    const seatsLabel = card.locator(':text-matches("\\bseats?\\b", "i")').first();
    await expect(seatsLabel).toBeVisible({ timeout: 15000 });
    const seatsText = (await seatsLabel.innerText()).trim();
    const match = seatsText.match(/(\d+)\s*seats?/i);
    if (!match) {
      throw new Error(
        `Could not parse initial seat count from label text: "${seatsText}"`
      );
    }
    const initialSeats = parseInt(match[1], 10);
    expect(initialSeats).toBeGreaterThanOrEqual(2);
    this.initialSeats = initialSeats;
  }
);

When('the user clicks the Book Now button on the dummy event card', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;

  // Scope the Book Now action to the dummy event card.
  const card = tp.eventCards
    .filter({ has: tp.page.locator('h3', { hasText: new RegExp(`^\\s*${DUMMY_EVENT_TITLE}\\s*$`, 'i') }) })
    .first();
  const bookNow = card.locator(
    'a:has-text("Book Now"), button:has-text("Book Now"), ' +
    'a:has-text("Book Event"), button:has-text("Book Event"), ' +
    'a:has-text("Reserve"), button:has-text("Reserve"), ' +
    'a:has-text("Register"), button:has-text("Register")'
  ).first();
  await bookNow.waitFor({ state: 'visible', timeout: 15000 });
  await bookNow.click();
});

Then('the booking form is visible', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;
  await expect(tp.bookingForm).toBeVisible({ timeout: 15000 });
  // Sanity-check that the canonical input fields are present in the form.
  await expect(tp.bookingFormSeatsInput).toBeVisible();
  await expect(tp.bookingFormEmailInput).toBeVisible();
  await expect(tp.bookingFormCardInput).toBeVisible();
  await expect(tp.bookingFormConfirmButton).toBeVisible();
});

When('the user fills the booking form with the dummy contact and payment data', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;
  await tp.bookingFormSeatsInput.fill(String(DUMMY_BOOKING.seats));
  await tp.bookingFormNameInput.fill(DUMMY_BOOKING.name);
  await tp.bookingFormEmailInput.fill(DUMMY_BOOKING.email);
  await tp.bookingFormPhoneInput.fill(DUMMY_BOOKING.phone);
  await tp.bookingFormCardInput.fill(DUMMY_BOOKING.card);
  await tp.bookingFormExpiryInput.fill(DUMMY_BOOKING.expiry);
  await tp.bookingFormCvvInput.fill(DUMMY_BOOKING.cvv);
});

When('the user submits the booking form', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;
  await tp.bookingFormConfirmButton.click();
});

Then('the booking success toast is visible', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;
  await expect(tp.bookingSuccessToast).toBeVisible({ timeout: 15000 });
});

Then('the booking form is no longer visible', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;
  // The modal/form should be hidden or detached after a successful booking.
  await tp.bookingForm.waitFor({ state: 'hidden', timeout: 15000 });
});

When('the user navigates to My Bookings', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;
  await tp.bookingsNavLink.first().click();
  await expect(tp.bookingsHeading).toBeVisible({ timeout: 15000 });
  // Wait for at least one booking card to be rendered.
  await expect(tp.bookingCards.first()).toBeVisible({ timeout: 15000 });
});

Then("the new booking for {string} is visible at the top of My Bookings", async function (this: CustomWorld, title: string) {
  const tp = this.pageLocator.testPage;
  // The first booking card should mention the dummy event title.
  await expect(tp.firstBookingCard).toBeVisible({ timeout: 15000 });
  await expect(tp.firstBookingEventName).toContainText(new RegExp(title, 'i'));
});

Then("the first booking card status is {string}", async function (this: CustomWorld, status: string) {
  const tp = this.pageLocator.testPage;
  await expect(tp.firstBookingStatus).toContainText(new RegExp(`^\\s*${status}\\s*$`, 'i'));
});

Then('the first booking card shows {int} seats', async function (this: CustomWorld, seatCount: number) {
  const tp = this.pageLocator.testPage;
  // Visible text should contain the digit and the word "seat" — e.g. "2 seats".
  const seatsText = (await tp.firstBookingSeats.innerText()).trim();
  expect(seatsText).toMatch(new RegExp(`\\b${seatCount}\\b\\s*seats?`, 'i'));
});

Then('the first booking card shows a price of either $49.99 or $99.98', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;
  const priceText = (await tp.firstBookingPrice.innerText()).trim();
  // Acceptable displays per the JSON: $49.99 (per-seat) or $99.98 (2 x 49.99).
  expect(priceText).toMatch(/\$\s*49\.99|\$\s*99\.98/);
});

When('the user navigates back to the Events listing', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;
  await tp.eventTab.click();
  await expect(tp.eventCards.first()).toBeVisible({ timeout: 15000 });
});

Then('the dummy event card\'s available seats have decreased to 98', async function (this: CustomWorld) {
  const tp = this.pageLocator.testPage;

  // Re-locate the dummy event card on the listing.
  const card = tp.eventCards
    .filter({ has: tp.page.locator('h3', { hasText: new RegExp(`^\\s*${DUMMY_EVENT_TITLE}\\s*$`, 'i') }) })
    .first();
  await expect(card).toBeVisible({ timeout: 15000 });

  // The seats label should now read 98 (or "2 seats booked" per the JSON).
  const seatsLabel = card.locator(':text-matches("\\bseats?\\b", "i")').first();
  await expect(seatsLabel).toBeVisible({ timeout: 15000 });
  const seatsText = (await seatsLabel.innerText()).trim();

  const initialSeats = this.initialSeats ?? 100;
  const expectedAfter = initialSeats - DUMMY_BOOKING.seats;

  const numericMatch = seatsText.match(/(\d+)\s*seats?\s*left/i);
  if (numericMatch) {
    expect(parseInt(numericMatch[1], 10)).toBe(expectedAfter);
    return;
  }

  // Fallback: card may show "2 seats booked" instead of "98 seats left".
  expect(seatsText).toMatch(new RegExp(`\\b${DUMMY_BOOKING.seats}\\s*seats?\\s*booked`, 'i'));
});
