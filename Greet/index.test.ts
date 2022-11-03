import { describe, expect, test, beforeEach } from "@jest/globals";
import { Context, HttpRequest } from "@azure/functions";
import httpTrigger from "./index";
import { buildContext, buildHttpRequest } from "../testHelper";

describe("Greet", () => {
  let context: Context;
  let request: HttpRequest;

  beforeEach(() => {
    context = buildContext();
    request = buildHttpRequest();
  });

  test("creates a new document", async () => {
    request.query = { name: "Azure fan" };
    await httpTrigger(context, request);
    expect(context.res.body).toMatch(/^Hello, Azure fan/);
  });

  test("creates nothing", async () => {
    await httpTrigger(context, request);
    expect(context.res.body).toMatch(/^This HTTP triggered function executed/);
  });
});
