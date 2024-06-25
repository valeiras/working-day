import { server } from "../mocks/server";
import MswWithSupabase from "./MswWithSupabase";
import { cleanup, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { QueryClient } from "@tanstack/react-query";
import { renderWithClient } from "../testUtils";

import { mockProjects } from "../mocks/mockData";
describe("MswWithSupabase", async () => {
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
    renderWithClient(queryClient, <MswWithSupabase />);
  });

  it("should get mockProjects from mock server", async () => {
    renderWithClient(queryClient, <MswWithSupabase />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."), { timeout: 10000 });
    expect(screen.getByText("Done")).toBeDefined();
    let projects = screen.getAllByTestId("project-p");

    mockProjects.forEach(({ name }, idx) => {
      expect(projects[idx].textContent).toBe(name);
    });
  });
});
