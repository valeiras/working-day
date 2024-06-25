import { server } from "../mocks/server";
import Msw from "./Msw";
import { cleanup, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { QueryClient } from "@tanstack/react-query";
import { renderWithClient } from "../testUtils";
describe("Msw", async () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    cleanup();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  it("should render", () => {
    renderWithClient(queryClient, <Msw />);
  });

  it("should get {msg: 'ok'} from mock server", async () => {
    renderWithClient(queryClient, <Msw />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), { timeout: 10000 });
    expect(screen.getByText("ok")).toBeDefined();
  });
});
