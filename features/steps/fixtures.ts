import {
  APIResponse,
  expect,
  request,
  APIRequestContext,
} from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";

const BASE_URL = `http://simple-books-api.glitch.me`;

type ContextBag = {
  [key: string]: any;
  apiContext: APIRequestContext;
};

type Fixtures = {
  ctx: ContextBag;
};

async function getApiContext() {
  const apiContext = await request.newContext({
    baseURL: BASE_URL,
  });

  if (!apiContext) {
    throw new Error("API context is not initialized.");
  }
  return apiContext as APIRequestContext;
}

export const test = base.extend<Fixtures>({
  ctx: async ({}, use) => {
    const apiContext = await getApiContext();
    const ctx: ContextBag = { apiContext };
    await use(ctx);
    await apiContext.dispose();
  },
});

export const { Given, When, Then } = createBdd(test);
