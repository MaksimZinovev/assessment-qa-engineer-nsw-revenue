import { test, expect, request, APIRequestContext } from "@playwright/test";

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
    console.dir(books, { depth: null });
    console.log(`Response status code: ${response.status()}`);
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
        console.info(`Response time: ${responseTime} ms `);
      } else {
        console.error("Response is undefined.");
      }
  });


})
