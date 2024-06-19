import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Project from "./page";

afterEach(() => {
  cleanup();
});

describe("Single project page", () => {
  it("should render", () => {
    render(<Project params={{ id: "55" }} />);
  });

  it("should render a heading with the project's name", () => {
    render(<Project params={{ id: "55" }} />);
    expect(screen.getByRole("heading", { level: 2, name: "Project" })).toBeDefined();
  });
});
