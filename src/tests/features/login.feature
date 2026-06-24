@TC_LGO_001
Feature: Login

  As an authenticated EventHub user
  I want to log out of the application
  So that my session is terminated and I am returned to the login page

  Scenario: Logged-in user can successfully log out and is redirected back to the login page
    Given user logs in using the configured credentials
    Then the authenticated app shell is visible
    When the user clicks the profile menu button
    Then the profile dropdown is visible and contains a Logout item
    When the user clicks the Logout item in the profile dropdown
    Then the user is redirected back to the login page
    And the login form is visible
    And the authenticated app shell is no longer visible
    When the user clicks the browser Back button
    Then the previous authenticated page is not accessible without re-authentication