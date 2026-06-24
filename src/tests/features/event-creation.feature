@TC_EVT_DMY_001
Feature: Event Creation

  As an authenticated EventHub user
  I want to create a new event using the Add Event form
  So that the new event appears in the Events listing

  Background:
    Given user logs in using the configured credentials
    And user clicks on Events tab

  Scenario: Happy path - Create a new event with all valid dummy fields and verify it appears in the listing
    When user clicks on add new event button
    And user fills new Event form with dummy data
    And user clicks on add event button
    Then the Event created success toast is visible
    And the new event appears in the listing
