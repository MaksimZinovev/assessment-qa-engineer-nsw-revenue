@api
Feature: Books

    Scenario: get books
        When GET "/books"
        Then status is 200
        And response array size is 6
        # And response time is within 1000 ms