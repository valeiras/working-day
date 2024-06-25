import { server } from "../mocks/server";
import MswAndSupabase from "./MswAndSupabase";
import { cleanup, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { QueryClient } from "@tanstack/react-query";
import { renderWithClient } from "../testUtils";
import Providers from "@/app/providers";
describe("MswAndSupabase", async () => {
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

  it("should have acces to environemnt variables", () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://gqcaeplynsenfupeaxwn.supabase.co");
  });

  it("should render", () => {
    render(
      <Providers>
        <MswAndSupabase />
      </Providers>
    );
  });

  it("should get mockProjects from mock server", async () => {
    renderWithClient(queryClient, <MswAndSupabase />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), { timeout: 10000 });
    expect(screen.getByText("Done")).toBeDefined();
  });
});
