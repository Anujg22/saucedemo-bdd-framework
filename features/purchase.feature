
Feature: SauceDemo purchase and authentication

  @smoke @purchase
  Scenario: Successful purchase of a single product
    Given I login as a standard user
    Then I should see the products page
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
    When I open the shopping cart
    Then I should see "Sauce Labs Backpack" in the cart
    When I checkout with valid customer details
    Then I should see the order confirmation page

  @negative
  Scenario: Invalid login shows an authentication error
    Given I attempt login with invalid credentials
    Then I should see an authentication error message
    And I should remain on the login page
