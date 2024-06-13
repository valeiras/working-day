import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "../app/(landing)/projects/page";
import Providers from "@/app/providers";

test("Projects", () => {
  render(
    <Providers>
      <Projects />
    </Providers>
  );
  expect(screen.getByRole("heading", { level: 2 })).toBeDefined();
});
