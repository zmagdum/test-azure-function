import { describe, expect, test, beforeEach } from "@jest/globals";
import { Context, HttpRequest } from "@azure/functions";
import httpTrigger from "./index";
import { buildContext, buildHttpRequest } from "../testHelper";

describe("TodoItem", () => {
  let context: Context;
  let request: HttpRequest;

  beforeEach(() => {
    context = buildContext();
    request = buildHttpRequest();
  });

  test("returns 404 if item is not found", async () => {
    await httpTrigger(context, request);

    expect(context.res.status).toEqual(404);
  });

  test("does not return a log document if item is not found", async () => {
    await httpTrigger(context, request);

    expect(context.bindings.outputDocument).toBeUndefined();
  });

  test("returns the document from the input binding", async () => {
    await httpTrigger(context, request, { id: "1" });

    expect(context.res.body).toEqual({ id: "1" });
  });

  test("returns a log document to the outputDocument binding", async () => {
    request.query = { id: "1" };
    await httpTrigger(context, request, { id: "1" });

    expect(context.bindings.outputDocument).toHaveProperty("id");
    expect(context.bindings.outputDocument).toHaveProperty("requestedId", "1");
    expect(context.bindings.outputDocument).toHaveProperty("timestamp");
  });
});
