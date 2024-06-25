import { server } from "../mocks/server";
import MswWithServerAction from "./MswWithServerAction";
import { cleanup, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("MswWithServerAction", async () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render", () => {
    render(<MswWithServerAction />);
  });

  it("should get {msg: 'ok'} from mock server", async () => {
    render(<MswWithServerAction />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), { timeout: 10000 });
    expect(screen.getByText("ok")).toBeDefined();
  });
});
