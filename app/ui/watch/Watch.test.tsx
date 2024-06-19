import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Watch from "./Watch";

afterEach(() => {
  cleanup();
});

describe("Watch", () => {
  it("should render", () => {
    render(<Watch timer={0} isRunning={false} handleStart={() => {}} handlePause={() => {}} handleStop={() => {}} />);
  });

  it("should render 00:00:00 if the timer value is 0", () => {
    render(<Watch timer={0} isRunning={false} handleStart={() => {}} handlePause={() => {}} handleStop={() => {}} />);
    expect(screen.getByRole("timer").textContent).toBe("00:00:00");
  });

  it("should render 01:01:01 if the timer value is 366100", () => {
    render(
      <Watch timer={366100} isRunning={false} handleStart={() => {}} handlePause={() => {}} handleStop={() => {}} />
    );
    expect(screen.getByRole("timer").textContent).toBe("01:01:01");
  });
});
