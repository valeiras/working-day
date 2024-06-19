import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "../app/(landing)/projects/page";
import Providers from "@/app/providers";

describe("Projects", () => {
  it("should render", () => {
    render(
      <Providers>
        <Projects />
      </Providers>
    );
  });
});
