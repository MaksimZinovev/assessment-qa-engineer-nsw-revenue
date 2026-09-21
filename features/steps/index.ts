import { And, When, Then } from "./fixtures";
import { expect } from "@playwright/test";

When(`GET {string}`, async ({ ctx }, url: string) => {
  ctx.response = await ctx.apiContext.get(url);
  if (ctx.response) {
    const books = await ctx.response.json();
    console.dir(books, { depth: null });
    console.log(`Response status code: ${ctx.response.status()}`);
  } else {
    console.error("Response is undefined.");
  }
});

Then(`status is {int}`, async ({ ctx }, code: number) => {
  expect(ctx.response.status()).toBe(code);
});

Then(`response array size is {int}`, async ({ ctx }, length: number) => {
  const books = await ctx.response.json();
  expect(books).toHaveLength(length);
});
