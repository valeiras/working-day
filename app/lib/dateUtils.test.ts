import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  getDateString,
  getPastFirstOfMonth,
  getPastLastOfMonth,
  getPastMonday,
  getThisFirstOfMonth,
  getThisLastOfMonth,
  getThisMonday,
} from "./dateUtils";

describe("getDateString", () => {
  test("returns a string in the format YYYY-MM-DD", () => {
    expect(getDateString(new Date())).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("The 5th of January 2021 is 2021-01-05", () => {
    expect(getDateString(new Date(2021, 0, 5))).toBe("2021-01-05");
  });

  test("The 15th of March 2024 is 2024-03-15", () => {
    expect(getDateString(new Date(2024, 2, 15))).toBe("2024-03-15");
  });
});

describe("getThisMonday", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  test("returns a Monday", () => {
    expect(getThisMonday().getDay()).toBe(1);
  });

  test("return the same day when it is a Monday", () => {
    // We set the system time to 2024-06-24
    const date = new Date(2024, 5, 24);
    vi.setSystemTime(date);
    expect(getThisMonday().getDate()).toEqual(new Date().getDate());
  });

  test("return the Monday of the current week", () => {
    // We set the system time to 2024-06-26
    const date = new Date(2024, 5, 26);
    vi.setSystemTime(date);
    expect(getThisMonday().getDate()).toEqual(new Date(2024, 5, 24).getDate());
  });
});
describe("getPastMonday", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  test("returns a Monday", () => {
    expect(getPastMonday().getDay()).toBe(1);
  });

  test("return the Monday of the past week", () => {
    // We set the system time to 2024-06-26
    const date = new Date(2024, 5, 26);
    vi.setSystemTime(date);
    expect(getPastMonday().getDate()).toEqual(new Date(2024, 5, 17).getDate());
  });
});

describe("getThisFirstOfMonth", () => {
  test("returns the first day of a month", () => {
    expect(getThisFirstOfMonth().getDate()).toBe(1);
  });

  test("returns a day of the current month", () => {
    expect(getThisFirstOfMonth().getMonth()).toEqual(new Date().getMonth());
  });
});
describe("getPastFirstOfMonth", () => {
  test("returns the first day of a month", () => {
    expect(getPastFirstOfMonth().getDate()).toBe(1);
  });

  test("returns a day of the past month", () => {
    const currDate = new Date();
    const pastMonthDate = new Date();
    pastMonthDate.setMonth(currDate.getMonth() - 1);
    expect(getPastFirstOfMonth().getMonth()).toEqual(pastMonthDate.getMonth());
  });
});
describe("getThisLastOfMonth", () => {
  test("returns a day of the current month", () => {
    console.log(getThisLastOfMonth());
    expect(getThisLastOfMonth().getMonth()).toEqual(new Date().getMonth());
  });
});
describe("getPastLastOfMonth", () => {
  test("returns a day of the past month", () => {
    const currDate = new Date();
    const pastMonthDate = new Date();
    pastMonthDate.setMonth(currDate.getMonth() - 1);
    expect(getPastLastOfMonth().getMonth()).toEqual(pastMonthDate.getMonth());
  });
});
