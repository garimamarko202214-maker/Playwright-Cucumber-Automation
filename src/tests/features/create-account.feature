@create-account
Feature: Create Account
  As a new visitor of EventHub
  I want to be able to create an account
  So that I can register, sign in, and access event features

  # -------------------------------------------------------------------------
  # Five scenarios covering the account-creation flow with fake data:
  #   TC_CREATE_ACCOUNT_001 — successful registration with valid fake data
  #   TC_CREATE_ACCOUNT_002 — "Register" link is reachable from the login page
  #   TC_CREATE_ACCOUNT_003 — password / confirm-password mismatch is rejected
  #   TC_CREATE_ACCOUNT_004 — registering with an already-used email is rejected
  #   TC_CREATE_ACCOUNT_005 — invalid email format is rejected
  # Each scenario in this file enters a fake email, password, and confirm
  # password; the positive path verifies the account is created, the negative
  # paths verify the form blocks submission.
  # -------------------------------------------------------------------------

  @smoke @regression @TC_CREATE_ACCOUNT_001 @positive
  Scenario: Successful account creation with all valid data
    Given user is on the EventHub login page
    When user clicks the "Register" link
    Then the Create Account form is displayed with all required fields visible
    When user enters first name "TestFirst"
    And user enters last name "TestLast"
    And user enters email "testuser2026@example.com"
    And user enters phone "9876543210"
    And user enters password "Test@123456"
    And user enters confirm password "Test@123456"
    And user clicks the Create Account button
    Then a success message is displayed
    And the user is redirected to the login page or auto-logged into the dashboard

  @smoke @regression @TC_CREATE_ACCOUNT_002 @navigation @ui
  Scenario: "Register" link is accessible from the login page
    Given user is on the EventHub login page
    Then the "Register" link is visible on the login page
    When user clicks the "Register" link
    Then the URL changes to the signup route
    And the Create Account form is displayed with all required fields visible

  @regression @TC_CREATE_ACCOUNT_003 @negative @validation @password-mismatch
  Scenario: Password and confirm password mismatch is rejected
    Given user is on the Create Account page
    When user enters first name "TestFirst"
    And user enters last name "TestLast"
    And user enters email "testuser2026@example.com"
    And user enters phone "9876543210"
    And user enters password "Test@123456"
    And user enters confirm password "Test@654321"
    And user clicks the Create Account button
    Then a "passwords do not match" error is shown
    And the form did not submit

  @regression @TC_CREATE_ACCOUNT_004 @negative @duplicate-email
  Scenario: Registering with an already-used email is rejected
    Given user is on the Create Account page
    When user enters first name "TestFirst"
    And user enters last name "TestLast"
    And user enters email "ginni@gmail.com"
    And user enters phone "9876543210"
    And user enters password "Test@123456"
    And user enters confirm password "Test@123456"
    And user clicks the Create Account button
    Then a "user with this email already exists" error is shown
    And the form did not submit

  @regression @TC_CREATE_ACCOUNT_005 @negative @validation @email-format
  Scenario: Invalid email format is rejected
    Given user is on the Create Account page
    When user enters first name "TestFirst"
    And user enters last name "TestLast"
    And user enters email "testuser2026.example.com"
    And user enters phone "9876543210"
    And user enters password "Test@123456"
    And user enters confirm password "Test@123456"
    And user clicks the Create Account button
    Then a "valid email" error is shown
    And the form did not submit
