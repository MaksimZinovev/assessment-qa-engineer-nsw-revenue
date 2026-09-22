import { test, expect, request, APIRequestContext } from "@playwright/test";
import { logger } from "./../support/logUtils";

const BASE_URL = `http://simple-books-api.glitch.me/`;
const BOOKS_ENDPOINT = `books`;
let apiContext: APIRequestContext | undefined;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: BASE_URL,
  });
});

async function getApiContext() {
  if (!apiContext) {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
    });
  }
  if (!apiContext) {
    throw new Error("API context is not initialized.");
  }
  return apiContext as APIRequestContext;
}

// Demonstrate navigating and asserting various records and elements from the response body Json array.
test.describe("Books API Tests", () => {
  test("T01 should display a list of available books", async ({}) => {
    apiContext = await getApiContext();
    const response = await apiContext.get(BOOKS_ENDPOINT);
    expect(response.status()).toBe(200);
    await expect(response).toBeOK();
    const books = await response.json();
    expect(books).toHaveLength(6);
    if (response) {
      logger.info("data:", books);
      logger.info(`Response status code:`, `${response.status()}`);
    } else {
      console.error("Response is undefined.");
    }
  });

  test("T02 should take less than 1 second to respond", async () => {
    apiContext = await getApiContext();
    const startTime = Date.now();
    const response = await apiContext.get(BOOKS_ENDPOINT);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    await expect(response).toBeOK();
    expect(responseTime).toBeLessThan(1000);

    if (response) {

      logger.info(`Response time:`, `${responseTime} ms `);
    } else {
      logger.error("Response is undefined.");
    }
  });

  test("T03 should have non-fiction book", async () => {
    apiContext = await getApiContext();

    const response = await apiContext.get(BOOKS_ENDPOINT);
    const books = await response.json();

    expect(books).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "non-fiction" }),
      ]),
    );
  });
  test("T04 every ids should be number", async ({}, testInfo) => {
    apiContext = await getApiContext();

    const response = await apiContext.get(BOOKS_ENDPOINT);
    const books = await response.json();

    await testInfo.attach("Books-response.json", {
      body: Buffer.from(JSON.stringify(books, null, 2)),
      contentType: "application/json",
    });

    expect(
      books.every((book: { id: number }) => typeof book.id === "number"),
    ).toBe(true);
  });
});
