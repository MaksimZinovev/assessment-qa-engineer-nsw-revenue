import { When, Then } from "./fixtures";
import { expect } from "@playwright/test";
import { logger } from "./../../support/logUtils";

When(`GET {string}`, async ({ ctx }, url: string) => {
  const startTime = Date.now();
  ctx.response = await ctx.apiContext.get(url);

  const endTime = Date.now();
  const responseTime = endTime - startTime;
  ctx.responseTime = responseTime;
  if (ctx.response) {
    const books = await ctx.response.json();
    logger.info("data:", books);
  } else {
    console.error("Response is undefined.");
  }
});

Then(`status is {int}`, async ({ ctx }, code: number) => {
  expect(ctx.response.status()).toBe(code);
  logger.info("Response status code:", ctx.response.status());
});

Then(`response array size is {int}`, async ({ ctx }, length: number) => {
  const books = await ctx.response.json();
  expect(books).toHaveLength(length);
  logger.info("Response arrays size:", books.length);
});

Then(`response time is within {int} ms`, async ({ ctx }, timeoutMs: number) => {
  expect(ctx.responseTime).toBeLessThan(timeoutMs);
  logger.info("Response time, ms:", ctx.responseTime);
});
