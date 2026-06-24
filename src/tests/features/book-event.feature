@TC_BKG_DMY_001
Feature: Book Event

  As an authenticated EventHub user
  I want to book seats for an event
  So that the booking appears in My Bookings and the event's available seats decrease

  Background:
    Given user logs in using the configured credentials
    And user clicks on Events tab
    # Ensure the dummy event exists before booking. The sandbox auto-replaces
    # the oldest event once 6 user events exist, so the create step is idempotent
    # (the form submit is a no-op when the event is already present in the
    # listing).
    When user clicks on add new event button
    And user fills new Event form with dummy data
    And user clicks on add event button

  Scenario: Happy path - Logged-in user books 2 seats for the dummy event 'Acme Test Concert 2026', sees a success toast, the booking appears in My Bookings as Confirmed, and the event's available seats decrease by 2
    When the user locates the event card for 'Acme Test Concert 2026' and captures the initial available seats
    And the user clicks the Book Now button on the dummy event card
    Then the booking form is visible
    When the user fills the booking form with the dummy contact and payment data
    And the user increments the ticket count to 2
    And the user submits the booking form
    Then the booking success confirmation is visible
    And the booking form is no longer visible
    When the user navigates to My Bookings
    Then the new booking for 'Acme Test Concert 2026' is visible at the top of My Bookings
    And the first booking card status is 'Confirmed'
    And the first booking card shows 2 tickets
    And the first booking card shows a total of $100
    When the user navigates back to the Events listing
    Then the dummy event card's available seats have decreased to 98