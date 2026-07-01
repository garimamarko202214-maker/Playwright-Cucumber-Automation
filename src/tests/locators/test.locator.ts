import { Page, Locator } from '@playwright/test';

export class TestPage {
  readonly page: Page;
  readonly userEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
 readonly eventTab: Locator;
readonly addNewEvent: Locator;
readonly eventTitle: Locator;
readonly eventDesc: Locator;
readonly categoryDD: Locator;
readonly eventCity: Locator;
 readonly eventVenue: Locator;
readonly eventCalender: Locator;
readonly eventPrice: Locator;
readonly eventSeat: Locator;
readonly addEventButton: Locator;

// --- My Bookings page locators (TC-BOOK-001/002/003) ---
readonly bookingsNavLink: Locator;
readonly bookingsHeading: Locator;
readonly bookingCards: Locator;
readonly firstBookingCard: Locator;
readonly firstBookingEventName: Locator;
readonly firstBookingDate: Locator;
readonly firstBookingVenue: Locator;
readonly firstBookingSeats: Locator;
readonly firstBookingPrice: Locator;
readonly firstBookingStatus: Locator;
readonly confirmedStatusBadges: Locator;
readonly cancelledStatusBadges: Locator;
readonly firstCancelButton: Locator;
readonly cancelConfirmModal: Locator;
readonly modalKeepBookingButton: Locator;
readonly modalConfirmCancelButton: Locator;
readonly cancelSuccessToast: Locator;
readonly emptyStateContainer: Locator;
readonly emptyStateHeading: Locator;
readonly emptyStateSubText: Locator;
readonly emptyStateCTA: Locator;

// --- Events listing field locators (TC-EVT-001) ---
readonly eventCards: Locator;
readonly firstEventCard: Locator;
readonly firstEventTitle: Locator;
readonly firstEventCategory: Locator;
readonly firstEventCity: Locator;
readonly firstEventVenue: Locator;
readonly firstEventDate: Locator;
readonly firstEventPrice: Locator;
readonly firstEventSeats: Locator;
readonly firstEventStatus: Locator;

// --- Add New Event validation / form locators (TC-EVT-003) ---
readonly eventTitleError: Locator;
readonly eventPriceError: Locator;
readonly eventSeatsError: Locator;
readonly eventCategoryError: Locator;
readonly eventCityError: Locator;
readonly eventVenueError: Locator;
readonly eventDateError: Locator;
readonly anyEventFormError: Locator;
readonly addEventForm: Locator;
readonly eventCreatedToast: Locator;

// --- Cancel Booking locators (TC_CB_001 .. TC_CB_050) ---
// Per-status booking card sets — derived from the shared .booking-card base.
// TC_CB_003 / TC_CB_004 / TC_CB_009 / TC_CB_019 all need to address Confirmed
// vs Cancelled cards directly, so we expose pre-filtered sets here.
readonly confirmedBookingCards: Locator;
readonly cancelledBookingCards: Locator;
readonly lastConfirmedBookingCard: Locator;
readonly cancelButtons: Locator;

// Confirmation modal — content + controls surfaced as discrete locators so
// step definitions can target the heading, the booking details, and the
// action buttons without re-querying the DOM on every step.
readonly cancelModalHeading: Locator;
readonly cancelModalEventName: Locator;
readonly cancelModalEventDate: Locator;
readonly cancelModalSeats: Locator;
readonly cancelModalPrice: Locator;
readonly cancelModalBackdrop: Locator;
readonly cancelModalCloseIcon: Locator;
readonly cancelModalRefundCopy: Locator;
readonly cancelModalConfirmButton: Locator;
readonly cancelModalKeepBookingButton: Locator;

// Toast / feedback surfaces — TC_CB_014 / TC_CB_015 / TC_CB_017 / TC_CB_018
// observe the success / error / close-X affordances on the toast.
readonly cancelSuccessToastHeading: Locator;
readonly cancelErrorToast: Locator;
readonly cancelToastCloseButton: Locator;

// ARIA hooks on the modal — TC_CB_012 / TC_CB_040 / TC_CB_041 / TC_CB_042
// read role="dialog" / aria-modal / aria-label / aria-live from these.
readonly cancelModalRoot: Locator;

// --- Logout locators (TC_LGO_001) ---
// Profile menu trigger, the dropdown it opens, the Logout item inside the
// dropdown, the authenticated app shell top nav, and the login form that
// becomes visible after the post-logout redirect.
readonly profileMenuButton: Locator;
readonly profileDropdown: Locator;
readonly logoutMenuItem: Locator;
readonly appShellTopNav: Locator;
readonly loginForm: Locator;

// --- Create Account page locators (TC_CREATE_ACCOUNT_001 .. TC_CREATE_ACCOUNT_035) ---
// Locators for the EventHub signup form. The form is reached via a
// "Create your account" / "Sign Up" link on the login page. Field-level
// locators combine role/label-based access (which works even when no
// stable id/placeholder is present) with attribute/data-testid fallbacks.
readonly createAccountLink: Locator;
readonly createAccountForm: Locator;
readonly firstNameInput: Locator;
readonly lastNameInput: Locator;
readonly registerEmailInput: Locator;
readonly registerPhoneInput: Locator;
readonly registerPasswordInput: Locator;
readonly registerConfirmPasswordInput: Locator;
readonly createAccountSubmitButton: Locator;

// Per-field inline error messages. The form uses common error containers
// (.error / .field-error / .invalid-feedback / role="alert"); each field's
// error is also addressable via an aria-describedby / sibling pattern.
readonly firstNameError: Locator;
readonly lastNameError: Locator;
readonly registerEmailError: Locator;
readonly registerPhoneError: Locator;
readonly registerPasswordError: Locator;
readonly registerConfirmPasswordError: Locator;
readonly anyRegisterFormError: Locator;

// Success / failure feedback surfaces after submission.
readonly registerSuccessToast: Locator;
readonly registerSuccessHeading: Locator;
readonly registerDuplicateEmailError: Locator;
readonly registerServerError: Locator;

// Password show/hide toggle (eye icon) — TC_CREATE_ACCOUNT_019.
readonly passwordVisibilityToggle: Locator;

// --- Book Event form locators (TC_BKG_DMY_001) ---
// Action that opens the booking form/modal on an event card. Matches the four
// label variants listed in the JSON (Book Now / Book Event / Reserve / Register).
readonly bookNowButton: Locator;
// Visible booking form/modal container rendered after clicking bookNowButton.
readonly bookingForm: Locator;
// Form input fields for the booking flow. Attribute-based selectors follow the
// patterns documented in the JSON's locatorsToAdd block.
readonly bookingFormSeatsInput: Locator;
readonly bookingFormNameInput: Locator;
readonly bookingFormEmailInput: Locator;
readonly bookingFormPhoneInput: Locator;
readonly bookingFormCardInput: Locator;
readonly bookingFormExpiryInput: Locator;
readonly bookingFormCvvInput: Locator;
// Final submit button inside the booking form.
readonly bookingFormConfirmButton: Locator;
// Success toast/notification shown after a successful booking.
readonly bookingSuccessToast: Locator;
// Available-seats badge/label on the event card (used to verify the seat count
// decreases from 100 to 98 after a successful booking).
readonly availableSeatsLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userEmailInput = this.page.getByPlaceholder('you@email.com');
    this.passwordInput = this.page.getByPlaceholder('••••••');
    this.signInButton = this.page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.locator('.error-message');
    this.eventTab=page.locator( '#nav-events')
    // Add Event form fields — the live EventHub admin form renders these as
    // accessible-name-labelled controls with NO `id` attributes, so role /
    // label-based locators are the only reliable strategy.
    this.addNewEvent = page.getByRole('button', { name: 'Add New Event' }).or(
      page.getByRole('link', { name: 'Add New Event' })
    ).first();
    this.eventTitle = page.getByRole('textbox', { name: /^title\*?$/i }).first();
    this.eventDesc = page.getByRole('textbox', { name: /^description$/i }).first();
    this.categoryDD = page.getByRole('combobox', { name: /^category\*?$/i }).first();
    this.eventCity = page.getByRole('textbox', { name: /^city\*?$/i }).first();
    this.eventVenue = page.getByRole('textbox', { name: /^venue\*?$/i }).first();
    this.eventCalender = page.getByRole('textbox', { name: /event date.*time\*?$/i }).first();
    this.eventPrice = page.getByRole('spinbutton', { name: /price.*\$\*?$/i }).first();
    this.eventSeat = page.getByRole('spinbutton', { name: /total seats\*?$/i }).first();
    // "+ Add Event" is the submit button on the admin Add-Event form.
    this.addEventButton = page.getByRole('button', { name: /^\+\s*add event$/i }).first();

    // Bookings nav link — matches the existing #nav-* convention used by the app shell
    // (eventTab uses '#nav-events'). Best-guess id derived from that pattern; falls
    // back to the visible "My Bookings" text via getByRole on the link.
    this.bookingsNavLink = page.locator('#nav-bookings, a[href="/bookings"]').or(
      page.getByRole('link', { name: /my bookings/i })
    );

    // Page heading — verified against JSON expectedResult ("Page heading reads 'My Bookings'")
    this.bookingsHeading = page.getByRole('heading', { name: /my bookings/i });

    // Booking cards/rows — common patterns in this Bootstrap-style demo app
    // (each booking rendered as a .card or li.booking-item). Combined selector
    // makes the locator resilient to either implementation.
    this.bookingCards = page.locator('.booking-card, .booking-item, [data-testid="booking-card"], .card:has(.status), .card:has-text("Confirmed"), .card:has-text("Cancelled")');
    this.firstBookingCard = this.bookingCards.first();

    // Individual fields inside the first booking — scoped to the first card to
    // avoid clashing with similar text elsewhere on the page.
    this.firstBookingEventName = this.firstBookingCard.locator('.event-name, .card-title, h3, h4').first();
    this.firstBookingDate = this.firstBookingCard.locator('.event-date, .booking-date, time, :text-matches("\\\\d{1,2}\\\\s?[A-Za-z]{3,}\\\\s?\\\\d{4}")').first();
    this.firstBookingVenue = this.firstBookingCard.locator('.event-venue, .venue, .location').first();
    this.firstBookingSeats = this.firstBookingCard.locator('.seats, .booking-seats, :text-matches("\\\\bseats?\\\\b", "i")').first();
    this.firstBookingPrice = this.firstBookingCard.locator('.price, .total-price, :text-matches("[₹$€£]\\\\s?\\\\d+")').first();
    this.firstBookingStatus = this.firstBookingCard.locator('.status, .badge, .booking-status').first();

    // Status badges scoped page-wide (used to confirm at least one Confirmed exists)
    this.confirmedStatusBadges = page.locator('.status, .badge, .booking-status').filter({ hasText: /confirmed/i });
    this.cancelledStatusBadges = page.locator('.status, .badge, .booking-status').filter({ hasText: /cancelled|canceled/i });

    // Cancel button on the first booking — observed pattern: button with visible
    // text "Cancel" or "Cancel Booking". Scoped to the first card to act on a
    // single deterministic row.
    this.firstCancelButton = this.firstBookingCard.getByRole('button', { name: /^cancel( booking)?$/i });

    // Confirmation modal — Bootstrap-style .modal[role=dialog] is the canonical
    // pattern in this demo app family. data-testid kept as a fallback.
    this.cancelConfirmModal = page.locator('.modal.show, [role="dialog"]:visible, [data-testid="cancel-confirm-modal"]').first();

    // Modal action buttons — exact button text taken from the JSON test case
    // (TC-BOOK-002 steps 4 & 5: "Close" / "Keep Booking" and "Confirm Cancel" / "Yes, Cancel").
    this.modalKeepBookingButton = this.cancelConfirmModal.getByRole('button', { name: /keep booking|close|cancel$/i });
    this.modalConfirmCancelButton = this.cancelConfirmModal.getByRole('button', { name: /confirm cancel|yes,? cancel|confirm/i });

    // Success toast / inline message after cancellation — common toastr/alert patterns
    this.cancelSuccessToast = page.locator('.toast, .alert-success, [role="status"], [data-testid="toast-success"]').filter({ hasText: /cancel/i });

    // Empty-state region — TC-BOOK-003 expects illustration + heading + subtext + CTA
    this.emptyStateContainer = page.locator('.empty-state, .no-bookings, [data-testid="empty-state"]').first();
    this.emptyStateHeading = page.getByRole('heading', { name: /no bookings yet|you haven'?t booked/i });
    this.emptyStateSubText = page.getByText(/browse upcoming events|book your first/i);
    this.emptyStateCTA = page.getByRole('button', { name: /browse events|explore events/i }).or(
      page.getByRole('link', { name: /browse events|explore events/i })
    );

    // --- Events listing locators (TC-EVT-001) ---
    // Verified against the live /events route (2026-06): the listing renders event
    // cards as <article> elements inside a CSS grid. Each card contains an image
    // area, a category badge (e.g. "Festival"), a "Featured" badge (optional), an
    // <a> wrapping an <h3> title, date/venue/price/seats rows, and a "Book Now"
    // button. There are NO `.event-card` / `.event-item` / `[data-testid="event-card"]`
    // hooks in the live DOM.
    this.eventCards = page.locator('main article');
    this.firstEventCard = this.eventCards.first();

    // Title is the <h3> inside the card's <a> link.
    this.firstEventTitle = this.firstEventCard.locator('h3').first();
    // Category is the rounded-full span in the image overlay (e.g. "Festival").
    this.firstEventCategory = this.firstEventCard.locator('span').filter({ hasText: /^(Conference|Concert|Sports|Workshop|Festival)$/ }).first();
    // "Featured" badge — only on featured events. Used as a status indicator.
    this.firstEventStatus = this.firstEventCard.locator('span', { hasText: /^Featured$/ }).first();
    // Date, venue, price, seats are text inside rows with SVG icons. Use
    // regex-based locators scoped to the card to avoid clashing with the nav/footer.
    this.firstEventDate = this.firstEventCard.locator(':text-matches("\\\\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\\\\s?\\\\d{1,2}\\\\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\\\b")').first();
    this.firstEventVenue = this.firstEventCard.locator(':text-matches("\\\\b(Mumbai|Bangalore|Delhi|Hyderabad|Chennai|Pune|Los Angeles|New York|London)\\\\b|, ")').first();
    this.firstEventPrice = this.firstEventCard.locator(':text-matches("\\\\$\\\\d{1,3}(,\\\\d{3})*(\\\\.\\\\d{1,2})?")').first();
    this.firstEventSeats = this.firstEventCard.locator(':text-matches("\\\\bseats?\\\\b", "i")').first();
    // City is not rendered as a separate field on the listing card; the venue line
    // is "Venue, City". Expose a city locator that picks up the city token.
    this.firstEventCity = this.firstEventCard.locator(':text-matches("\\\\b(Mumbai|Bangalore|Delhi|Hyderabad|Chennai|Pune|Los Angeles|New York|London)\\\\b")').first();

    // "Event created!" success toast — appears after submitting the Add Event form.
    // The live toast is a generic <div> with an inner <p> reading the literal
    // text "Event created!" and a "Dismiss" button. Walk up to the closest
    // toast container so callers can assert on the wrapper (e.g. visibility,
    // toContainText) without us re-querying the DOM.
    this.eventCreatedToast = page.locator('p', { hasText: /^Event created!$/ })
      .locator('xpath=ancestor::div[1]');

    // --- Add New Event validation locators (TC-EVT-003) ---
    // Inline error messages per field. The form uses both .error / .invalid-feedback
    // / .field-error classes; the data-testid values are best-guess hooks derived
    // from the JSON IDs.
    this.eventTitleError = page.locator(
      '#event-title-input ~ .error, #event-title-error, [data-testid="event-title-error"], .field-error:has(+ #event-title-input)'
    );
    this.eventPriceError = page.locator(
      '#price ~ .error, #price-error, [data-testid="price-error"], .field-error:has(+ input[placeholder="0.00"])'
    );
    this.eventSeatsError = page.locator(
      '#total-seats ~ .error, #total-seats-error, [data-testid="total-seats-error"], .field-error:has(+ #total-seats)'
    );
    this.eventCategoryError = page.locator(
      '#category ~ .error, #category-error, [data-testid="category-error"]'
    );
    this.eventCityError = page.locator(
      '#city ~ .error, #city-error, [data-testid="city-error"]'
    );
    this.eventVenueError = page.locator(
      '#venue ~ .error, #venue-error, [data-testid="venue-error"]'
    );
    this.eventDateError = page.locator(
      '#event-date-&-time ~ .error, #event-date-error, [data-testid="event-date-error"]'
    );

    // Generic "any validation error visible" — used in TC-EVT-003 to assert the
    // form did not silently submit.
    this.anyEventFormError = page.locator(
      '.error:visible, .invalid-feedback:visible, .field-error:visible, [role="alert"]:visible, .text-danger:visible, .error-message:visible'
    );

    // The Add Event modal/form container — used to confirm the form is open.
    this.addEventForm = page.locator(
      '.modal:visible, [role="dialog"]:visible, form:has(#add-event-btn)'
    ).first();

    // --- Cancel Booking: per-status card sets ------------------------------
    // Confirmed/Cancelled sets are .booking-card containers whose status
    // badge text matches the desired status. Used by TC_CB_003 (multi),
    // TC_CB_004 (visibility), TC_CB_019 (no Cancel on Cancelled).
    this.confirmedBookingCards = this.bookingCards.filter({
      has: this.page.locator('.status, .badge, .booking-status').filter({ hasText: /confirmed/i })
    });
    this.cancelledBookingCards = this.bookingCards.filter({
      has: this.page.locator('.status, .badge, .booking-status').filter({ hasText: /cancelled|canceled/i })
    });
    this.lastConfirmedBookingCard = this.confirmedBookingCards.last();
    this.cancelButtons = this.confirmedBookingCards.getByRole('button', {
      name: /^cancel( booking)?$/i
    });

    // --- Cancel Booking: confirmation modal --------------------------------
    // Heading text from JSON: "Confirm Cancellation" / "Are you sure?".
    this.cancelModalHeading = this.cancelConfirmModal.getByRole('heading', {
      name: /confirm cancellation|are you sure\??/i
    });
    // Booking details shown inside the modal (TC_CB_005).
    this.cancelModalEventName = this.cancelConfirmModal.locator(
      '.event-name, .booking-event-name, .modal-event-name, [data-testid="modal-event-name"]'
    ).first();
    this.cancelModalEventDate = this.cancelConfirmModal.locator(
      '.event-date, .booking-date, time, [data-testid="modal-event-date"]'
    ).first();
    this.cancelModalSeats = this.cancelConfirmModal.locator(
      '.seats, .booking-seats, [data-testid="modal-seats"]'
    ).first();
    this.cancelModalPrice = this.cancelConfirmModal.locator(
      '.price, .total-price, .refund-amount, [data-testid="modal-price"]'
    ).first();
    // The backdrop is whatever sits behind the dialog content. We target the
    // .modal element itself; Playwright's click on the corner will hit the
    // backdrop, not the dialog content.
    this.cancelModalBackdrop = this.cancelConfirmModal;
    this.cancelModalCloseIcon = this.cancelConfirmModal.getByRole('button', {
      name: /^close$|×/i
    }).or(this.cancelConfirmModal.locator('.modal-close, [aria-label="Close"]'));
    // Refund / policy copy (TC_CB_031) — falls back to any text mentioning
    // refund or cancellation policy.
    this.cancelModalRefundCopy = this.cancelConfirmModal.locator(
      '.refund-policy, .modal-refund, [data-testid="modal-refund-copy"], :text-matches("refund|cancellation policy", "i")'
    ).first();

    // Re-export the existing modal button locators under the names used by
    // the cancel-booking scenarios to keep the step file readable.
    this.cancelModalConfirmButton = this.modalConfirmCancelButton;
    this.cancelModalKeepBookingButton = this.modalKeepBookingButton;

    // --- Cancel Booking: toast / feedback surfaces ------------------------
    // Success toast — heading row of the toast container so we can assert
    // the textual content independently of the close button.
    this.cancelSuccessToastHeading = this.cancelSuccessToast.locator(
      '.toast-title, .toast-message, p, span, div'
    ).first();
    // Error toast — distinct from the success toast; used by TC_CB_017 /
    // TC_CB_018 / TC_CB_043 to verify the failure path.
    this.cancelErrorToast = page.locator(
      '.toast-error, .alert-danger, [role="alert"], [data-testid="toast-error"]'
    ).filter({ hasText: /(cancel|network|server|error|fail)/i });
    // Optional close (X) on the toast — TC_CB_015.
    this.cancelToastCloseButton = this.cancelSuccessToast.getByRole('button', {
      name: /^close$|×/i
    }).or(this.cancelSuccessToast.locator('.toast-close, [aria-label="Close"]'));

    // --- Cancel Booking: ARIA hooks ---------------------------------------
    // Single, visible dialog element. role() and getAttribute() in the
    // step definitions read role / aria-modal / aria-labelledby from this
    // locator directly.
    this.cancelModalRoot = this.cancelConfirmModal;

    // --- Logout locators (TC_LGO_001) -------------------------------------
    // The live EventHub app exposes the Logout action as a direct button in
    // the top <navigation> element — there is no intermediate profile-menu
    // trigger and no dropdown. The selectors below mirror that reality.
    //
    // `profileMenuButton` is kept as a defensive locator for any future
    // variant that reintroduces an avatar/menu trigger. In the live app this
    // resolves to zero elements, and the corresponding step becomes a no-op.
    this.profileMenuButton = page.locator(
      '#profile-menu, [data-testid="profile-menu"], button[aria-haspopup="menu"], ' +
      'button[aria-label*="profile" i], button[aria-label*="account" i]'
    ).first();

    // The dropdown container that appears after clicking the profile menu.
    // The live app does NOT render a separate dropdown — Logout is a direct
    // button in the top nav. We keep this locator as a defensive fallback for
    // any future variant that reintroduces a dropdown.
    this.profileDropdown = page.locator(
      '.dropdown-menu.show, [role="menu"]:visible, [data-testid="profile-dropdown"]:visible'
    ).first();

    // The Logout / Sign out menu item inside the profile dropdown (or, in the
    // live app, the Logout button in the top nav). Text matches
    // /log\s*out|sign\s*out/i to cover the four variants listed in the JSON's
    // logoutActionLabels (Logout / Log out / Sign out / Sign Out).
    this.logoutMenuItem = page.getByRole('button', { name: /^log\s*out|sign\s*out$/i }).first();

    // The authenticated top navigation — confirms the app shell is mounted
    // and contains the Events / My Bookings tabs. The live app uses a bare
    // <navigation> element at the top level (no <header> wrapper), so the
    // selector must allow that.
    this.appShellTopNav = page.locator(
      'nav, [role="navigation"]:visible, header nav, .app-shell-nav, [data-testid="app-shell-nav"]'
    ).first();

    // The login form element — used to confirm we are back on the login page
    // after the post-logout redirect. Matches the email/password inputs that
    // the login step targets.
    this.loginForm = page.locator(
      'form:has(input[placeholder="you@email.com"]), form:has(input[placeholder*="•" i]), ' +
      '[data-testid="login-form"], #login-form'
    ).first();

    // --- Book Event form locators (TC_BKG_DMY_001) -----------------------
    // Book Now / Book Event / Reserve / Register — a button or link inside
    // an event card. Scope to article.event-card / .event-card so it doesn't
    // pick up a nav-level CTA.
    this.bookNowButton = page.locator(
      'main article a:has-text("Book Now"), main article button:has-text("Book Now"), ' +
      'main article a:has-text("Book Event"), main article button:has-text("Book Event"), ' +
      'main article a:has-text("Reserve"), main article button:has-text("Reserve"), ' +
      'main article a:has-text("Register"), main article button:has-text("Register"), ' +
      '.event-card a:has-text("Book Now"), .event-card button:has-text("Book Now"), ' +
      '.event-card a:has-text("Book Event"), .event-card button:has-text("Book Event"), ' +
      '.event-card a:has-text("Reserve"), .event-card button:has-text("Reserve"), ' +
      '.event-card a:has-text("Register"), .event-card button:has-text("Register"), ' +
      '[data-testid="book-now"], [data-testid="book-event"]'
    ).first();

    // The visible booking form/modal that opens after clicking bookNowButton.
    // Mirrors the addEventForm locator pattern (.modal:visible / [role="dialog"]).
    this.bookingForm = page.locator(
      '.modal.show:visible, [role="dialog"]:visible, form#booking-form:visible, ' +
      '[data-testid="booking-form"]:visible, [data-testid="booking-modal"]:visible'
    ).first();

    // Form inputs — attribute patterns from the JSON's locatorsToAdd block.
    this.bookingFormSeatsInput = this.bookingForm.locator(
      'input[type="number"][name*="seat" i], #booking-seats, [data-testid="booking-seats"]'
    ).first();
    this.bookingFormNameInput = this.bookingForm.locator(
      'input[name*="name" i], input[placeholder*="name" i], #booking-name, [data-testid="booking-name"]'
    ).first();
    this.bookingFormEmailInput = this.bookingForm.locator(
      'input[type="email"], input[name*="email" i], #booking-email, [data-testid="booking-email"]'
    ).first();
    this.bookingFormPhoneInput = this.bookingForm.locator(
      'input[type="tel"], input[name*="phone" i], #booking-phone, [data-testid="booking-phone"]'
    ).first();
    this.bookingFormCardInput = this.bookingForm.locator(
      'input[name*="card" i], input[placeholder*="card" i], #booking-card, [data-testid="booking-card"]'
    ).first();
    this.bookingFormExpiryInput = this.bookingForm.locator(
      'input[name*="expir" i], input[placeholder*="mm/yy" i], #booking-expiry, [data-testid="booking-expiry"]'
    ).first();
    this.bookingFormCvvInput = this.bookingForm.locator(
      'input[name*="cvv" i], input[placeholder*="cvv" i], #booking-cvv, [data-testid="booking-cvv"]'
    ).first();

    // Final submit button — submit type preferred, fall back to text match.
    this.bookingFormConfirmButton = this.bookingForm.locator(
      'button[type="submit"], button:has-text("Confirm"), button:has-text("Book"), ' +
      'button:has-text("Pay"), #booking-submit, [data-testid="booking-confirm"]'
    ).first();

    // Success toast — div / role="status" with text matching
    // /booked|booking\s*confirmed|payment\s*successful/i. Scope to live DOM
    // (visible) to avoid hitting stale nodes.
    this.bookingSuccessToast = page.locator(
      '.toast:visible, .alert-success:visible, [role="status"]:visible, ' +
      '[data-testid="toast-success"]:visible, [data-testid="booking-success-toast"]:visible'
    ).filter({ hasText: /booked|booking\s*confirmed|payment\s*successful/i }).first();

    // Available-seats badge on the event card. Reuses the firstEventSeats
    // regex pattern (matches the literal word "seats" / "seats left").
    this.availableSeatsLabel = page.locator(
      'main article :text-matches("\\\\bseats?\\\\b", "i"), ' +
      '.event-card :text-matches("\\\\bseats?\\\\b", "i")'
    ).first();

    // --- Create Account page locators ------------------------------------
    // Link on the login page that opens the signup form. Match any of the
    // four common labels listed in the JSON: "Create your account",
    // "Sign Up", "Sign up", "Register".
    this.createAccountLink = page.getByRole('link', {
      name: /create\s*(your\s*)?(new\s*)?account|sign\s*up|register/i
    }).or(page.getByRole('button', {
      name: /create\s*(your\s*)?(new\s*)?account|sign\s*up|register/i
    })).first();

    // The signup form container — visible modal/page form. Mirrors the
    // pattern used for addEventForm and bookingForm.
    this.createAccountForm = page.locator(
      'form:visible, .signup-form:visible, .register-form:visible, ' +
      '[data-testid="register-form"]:visible, [data-testid="signup-form"]:visible, ' +
      'form#register-form, form#signup-form'
    ).first();

    // Field inputs — role/label-based selectors are the primary strategy
    // because EventHub inputs are often unlabelled by id or placeholder.
    this.firstNameInput = page.getByRole('textbox', {
      name: /^first\s*name\*?$/i
    }).or(page.locator(
      'input[name*="firstName" i], input[placeholder*="first" i], ' +
      '#first-name, [data-testid="first-name"]'
    )).first();

    this.lastNameInput = page.getByRole('textbox', {
      name: /^last\s*name\*?$/i
    }).or(page.locator(
      'input[name*="lastName" i], input[placeholder*="last" i], ' +
      '#last-name, [data-testid="last-name"]'
    )).first();

    this.registerEmailInput = page.getByRole('textbox', {
      name: /^e-?mail(\s*address)?\*?$/i
    }).or(page.locator(
      'input[type="email"]:visible, input[name*="email" i]:visible, ' +
      '#register-email, #signup-email, [data-testid="register-email"]'
    )).first();

    this.registerPhoneInput = page.getByRole('textbox', {
      name: /^phone(\s*number)?\*?$/i
    }).or(page.getByRole('spinbutton', {
      name: /^phone(\s*number)?\*?$/i
    })).or(page.locator(
      'input[type="tel"]:visible, input[name*="phone" i]:visible, ' +
      '#phone, [data-testid="register-phone"]'
    )).first();

    this.registerPasswordInput = page.getByRole('textbox', {
      name: /^password\*?$/i
    }).or(page.locator(
      'input[type="password"]:visible[name*="password" i]:not([name*="confirm" i]), ' +
      '#password, [data-testid="register-password"]'
    )).first();

    this.registerConfirmPasswordInput = page.getByRole('textbox', {
      name: /confirm\s*password\*?$/i
    }).or(page.locator(
      'input[type="password"]:visible[name*="confirm" i], ' +
      '#confirm-password, [data-testid="confirm-password"]'
    )).first();

    // The submit button — match the four common label variants from the
    // JSON (Create Account / Sign Up / Register / Submit).
    this.createAccountSubmitButton = page.getByRole('button', {
      name: /create\s*account|sign\s*up|^register$|^submit$/i
    }).first();

    // Per-field inline error messages. The form may use .error /
    // .field-error / .invalid-feedback / role="alert" / .text-danger.
    // We try a sibling-of-input pattern (error sits directly below the
    // input) and an aria-describedby / data-testid pattern.
    this.firstNameError = this.firstNameInput.locator(
      'xpath=following-sibling::*[contains(@class,"error") or ' +
      'contains(@class,"invalid-feedback") or contains(@class,"text-danger") or ' +
      'contains(@class,"field-error")][1]'
    ).or(page.locator(
      '#first-name-error, [data-testid="first-name-error"]'
    )).first();

    this.lastNameError = this.lastNameInput.locator(
      'xpath=following-sibling::*[contains(@class,"error") or ' +
      'contains(@class,"invalid-feedback") or contains(@class,"text-danger") or ' +
      'contains(@class,"field-error")][1]'
    ).or(page.locator(
      '#last-name-error, [data-testid="last-name-error"]'
    )).first();

    this.registerEmailError = this.registerEmailInput.locator(
      'xpath=following-sibling::*[contains(@class,"error") or ' +
      'contains(@class,"invalid-feedback") or contains(@class,"text-danger") or ' +
      'contains(@class,"field-error")][1]'
    ).or(page.locator(
      '#register-email-error, [data-testid="register-email-error"]'
    )).first();

    this.registerPhoneError = this.registerPhoneInput.locator(
      'xpath=following-sibling::*[contains(@class,"error") or ' +
      'contains(@class,"invalid-feedback") or contains(@class,"text-danger") or ' +
      'contains(@class,"field-error")][1]'
    ).or(page.locator(
      '#phone-error, [data-testid="register-phone-error"]'
    )).first();

    this.registerPasswordError = this.registerPasswordInput.locator(
      'xpath=following-sibling::*[contains(@class,"error") or ' +
      'contains(@class,"invalid-feedback") or contains(@class,"text-danger") or ' +
      'contains(@class,"field-error")][1]'
    ).or(page.locator(
      '#password-error, [data-testid="register-password-error"]'
    )).first();

    this.registerConfirmPasswordError = this.registerConfirmPasswordInput.locator(
      'xpath=following-sibling::*[contains(@class,"error") or ' +
      'contains(@class,"invalid-feedback") or contains(@class,"text-danger") or ' +
      'contains(@class,"field-error")][1]'
    ).or(page.locator(
      '#confirm-password-error, [data-testid="confirm-password-error"]'
    )).first();

    // Generic "any error visible" — used in scenarios that assert the form
    // did not silently submit. The selector intentionally restricts to
    // visible elements and the common error classes used by EventHub.
    this.anyRegisterFormError = page.locator(
      '.error:visible, .invalid-feedback:visible, .field-error:visible, ' +
      '[role="alert"]:visible, .text-danger:visible, .error-message:visible'
    );

    // Success toast / inline message after a successful registration. The
    // heading locator exposes the title text for the success assertion.
    this.registerSuccessToast = page.locator(
      '.toast:visible, .alert-success:visible, [role="status"]:visible, ' +
      '[data-testid="toast-success"]:visible, [data-testid="register-success-toast"]:visible'
    ).filter({ hasText: /account\s*created|registered\s*successfully|sign-?up\s*success/i }).first();

    this.registerSuccessHeading = this.registerSuccessToast.locator(
      '.toast-title, .toast-message, p, span, div'
    ).first();

    // Duplicate-email error (TC_CREATE_ACCOUNT_015 / 022 / 023).
    this.registerDuplicateEmailError = page.locator(
      '.toast-error, .alert-danger, [role="alert"], [data-testid="register-duplicate-email"]'
    ).filter({ hasText: /already\s*exists|already\s*registered|email\s*is\s*taken/i }).first();

    // Server-side / generic error (TC_CREATE_ACCOUNT_028).
    this.registerServerError = page.locator(
      '.toast-error, .alert-danger, [role="alert"], [data-testid="register-server-error"]'
    ).filter({ hasText: /something\s*went\s*wrong|server|try\s*again|unexpected/i }).first();

    // Password show/hide toggle (eye icon) inside or adjacent to the
    // Password field. The toggle is typically a button with an aria-label
    // of "Show password" / "Hide password" or a data-testid hook.
    this.passwordVisibilityToggle = this.registerPasswordInput.locator(
      'xpath=following-sibling::button[1]'
    ).or(page.locator(
      'button[aria-label*="show" i][aria-label*="password" i], ' +
      'button[aria-label*="hide" i][aria-label*="password" i], ' +
      'button[aria-label*="toggle" i][aria-label*="password" i], ' +
      '[data-testid="password-toggle"], [data-testid="toggle-password"]'
    )).first();
  }

  // -------------------------------------------------------------------------
  // Cancel Booking helper actions
  //
  // Each helper is a small "do one thing" method that encapsulates the
  // Playwright interactions used by the step definitions. Centralising them
  // here means a future DOM change only needs to be patched in one place.
  // -------------------------------------------------------------------------

  /** Click the Cancel button on the first Confirmed booking card. */
  async clickCancelOnFirstConfirmed(): Promise<void> {
    await this.confirmedBookingCards.first().getByRole('button', {
      name: /^cancel( booking)?$/i
    }).click();
  }

  /** Click the Cancel button on the last Confirmed booking card. */
  async clickCancelOnLastConfirmed(): Promise<void> {
    await this.lastConfirmedBookingCard.getByRole('button', {
      name: /^cancel( booking)?$/i
    }).click();
  }

  /** Wait for the cancel confirmation modal to become visible. */
  async waitForCancelModal(): Promise<void> {
    await this.cancelConfirmModal.waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Click the destructive "Confirm Cancel" / "Yes, Cancel" button. */
  async confirmCancellation(): Promise<void> {
    await this.cancelModalConfirmButton.click();
  }

  /** Click the safe "Keep Booking" / "Close" button. */
  async clickKeepBooking(): Promise<void> {
    await this.cancelModalKeepBookingButton.click();
  }

  /** Wait for the cancel modal to disappear. */
  async waitForCancelModalClosed(): Promise<void> {
    await this.cancelConfirmModal.waitFor({ state: 'hidden', timeout: 15000 });
  }

  /**
   * Click on the modal backdrop / overlay to dismiss without confirming.
   * Targets the corner of the modal element itself so the dialog content is
   * not hit.
   */
  async clickModalBackdrop(): Promise<void> {
    const box = await this.cancelConfirmModal.boundingBox();
    if (!box) {
      // Fallback to a selector-based press at the top edge.
      await this.cancelConfirmModal.click({ position: { x: 5, y: 5 } });
      return;
    }
    // Click outside the centered dialog content — top-left of the modal
    // box is usually the backdrop.
    await this.page.mouse.click(box.x + 5, box.y + 5);
  }

  /** Count of booking cards currently in the given status (case-insensitive). */
  async countByStatus(status: 'Confirmed' | 'Cancelled'): Promise<number> {
    const set = status === 'Confirmed'
      ? this.confirmedBookingCards
      : this.cancelledBookingCards;
    return await set.count();
  }

  // -------------------------------------------------------------------------
  // Create Account helper actions (TC_CREATE_ACCOUNT_001 .. TC_CREATE_ACCOUNT_035)
  //
  // Each helper wraps a single field-fill or button-click. Centralising them
  // keeps the step definitions declarative and means a future DOM change
  // only requires patching the locator or one helper method.
  // -------------------------------------------------------------------------

  /** Navigate to the EventHub login page and wait for the form to render. */
  async gotoEventHubLoginPage(): Promise<void> {
    await this.page.goto('https://eventhub.rahulshettyacademy.com/');
    await this.userEmailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Click the "Create your account" / "Sign Up" link on the login page. */
  async clickCreateAccountLink(): Promise<void> {
    await this.createAccountLink.click();
    await this.createAccountForm.waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Fill the First Name field. */
  async fillFirstName(value: string): Promise<void> {
    await this.firstNameInput.fill(value);
  }

  /** Fill the Last Name field. */
  async fillLastName(value: string): Promise<void> {
    await this.lastNameInput.fill(value);
  }

  /** Fill the register Email field. */
  async fillRegisterEmail(value: string): Promise<void> {
    await this.registerEmailInput.fill(value);
  }

  /** Fill the Phone Number field. */
  async fillRegisterPhone(value: string): Promise<void> {
    await this.registerPhoneInput.fill(value);
  }

  /** Fill the Password field. */
  async fillRegisterPassword(value: string): Promise<void> {
    await this.registerPasswordInput.fill(value);
  }

  /** Fill the Confirm Password field. */
  async fillRegisterConfirmPassword(value: string): Promise<void> {
    await this.registerConfirmPasswordInput.fill(value);
  }

  /** Clear the Phone Number field (used between sub-attempts in TC_017). */
  async clearRegisterPhone(): Promise<void> {
    await this.registerPhoneInput.fill('');
  }

  /** Clear the Email field (used between sub-attempts in TC_011). */
  async clearRegisterEmail(): Promise<void> {
    await this.registerEmailInput.fill('');
  }

  /** Click the submit button on the Create Account form. */
  async clickCreateAccountSubmit(): Promise<void> {
    await this.createAccountSubmitButton.click();
  }

  /** Wait until the registration success toast becomes visible. */
  async waitForRegisterSuccessToast(): Promise<void> {
    await this.registerSuccessToast.waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Wait until the duplicate-email error message becomes visible. */
  async waitForDuplicateEmailError(): Promise<void> {
    await this.registerDuplicateEmailError.waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Wait until a server-side error message becomes visible. */
  async waitForRegisterServerError(): Promise<void> {
    await this.registerServerError.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Returns the form's submit button enabled state — used to assert
   * enabled/disabled for TC_CREATE_ACCOUNT_024.
   */
  async isCreateAccountSubmitEnabled(): Promise<boolean> {
    return await this.createAccountSubmitButton.isEnabled();
  }

  /** Click the password show/hide toggle (eye icon). */
  async clickPasswordVisibilityToggle(): Promise<void> {
    await this.passwordVisibilityToggle.click();
  }

  /**
   * Force the next signup request to return a 500 response. Used by
   * TC_CREATE_ACCOUNT_028. The wildcard covers the various signup
   * endpoint names used by EventHub (e.g. /api/register, /signup).
   */
  async stubSignupServerError(): Promise<void> {
    await this.page.route('**/api/**', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      });
    });
  }

  /** Resize the viewport to a mobile size (TC_CREATE_ACCOUNT_026). */
  async setMobileViewport(): Promise<void> {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }
}