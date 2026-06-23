@debug @my-bookings
Feature: My Bookings

  Background:
    Given user login into the app

  @TC-BOOK-001 @smoke @regression1 @high
  Scenario: TC-BOOK-001 — My Bookings page lists all existing bookings with complete details after login
    When user clicks on My Bookings tab
    And user waits for the My Bookings page to load
    Then the My Bookings page heading should be visible
    And the first booking card should be visible with complete details
    And the My Bookings nav tab should be active
    And at least one Confirmed booking should be visible on the My Bookings page

  @TC-BOOK-002 @smoke @regression1 @high
  Scenario: TC-BOOK-002 — Successful cancellation of a Confirmed booking via the confirmation modal
    When user clicks on My Bookings tab
    And user waits for the My Bookings page to load
    And user verifies a Confirmed booking is available for cancellation
    When user captures the event name and status of the first booking before cancellation
    And user clicks the Cancel button on the first booking card
    Then the cancellation confirmation modal should be visible
    And the modal should expose Keep Booking and Confirm Cancel actions
    When user clicks Confirm Cancel in the modal
    Then the cancellation success toast should be visible
    And the cancelled booking should now show a Cancelled status badge
    And the previously captured event name should no longer appear as a Confirmed booking
    When user clicks the Cancel button on another booking card (if available)
    And user clicks Keep Booking in the modal
    Then the modal should close without changing the other booking status
