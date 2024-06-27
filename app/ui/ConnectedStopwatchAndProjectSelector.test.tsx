import { server } from "../lib/tests/mocks/server";
import { mockProjects } from "../lib/tests/mocks/mockData";
import ConnectedStopwatchAndProjectSelector from "./ConnectedStopwatchAndProjectSelector";
import { cleanup, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { QueryClient } from "@tanstack/react-query";
import { renderWithClient } from "../lib/tests/testUtils";

describe("ConnectedStopwatchAndProjectSelector", async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  beforeAll(() => server.listen());
  beforeEach(() => {
    queryClient.clear();
    cleanup();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render", () => {
    renderWithClient(queryClient, <ConnectedStopwatchAndProjectSelector />);
  });
});
