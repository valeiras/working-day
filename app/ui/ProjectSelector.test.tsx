import { server } from "../lib/tests/mocks/server";
import { mockProjects } from "../lib/tests/mocks/mockData";
import ProjectSelector from "./ProjectSelector";
import { cleanup, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { QueryCache, QueryClient } from "@tanstack/react-query";
import { renderWithClient } from "../lib/tests/testUtils";
describe("ProjectSelector", async () => {
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
    renderWithClient(queryClient, <ProjectSelector setProjectId={() => {}} />);
  });

  it("should have acces to environemnt variables", () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://gqcaeplynsenfupeaxwn.supabase.co");
  });

  it("should render loading state", () => {
    renderWithClient(queryClient, <ProjectSelector setProjectId={() => {}} />);
    expect(screen.queryByText("Loading projects...")).toBeDefined();
  });

  it("should get data from mock server", async () => {
    const { getAllByTestId } = renderWithClient(queryClient, <ProjectSelector setProjectId={() => {}} />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading projects..."), { timeout: 10000 });
    let options = getAllByTestId("select-project-option");
    expect(options[0].textContent).toBe("Select your project");
    mockProjects.forEach(({ name }, idx) => {
      expect(options[idx + 1].textContent).toBe(name);
    });
  }, 10000);
});
