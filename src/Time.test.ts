import { expect } from "@std/expect";
import { ago, datestring } from "./Time.ts";

const resetOptions: Intl.DateTimeFormatOptions = {
    timeZone: "UTC",
};

Deno.test("datestring", () => {
    expect(datestring("2018-03-30 19:18", "en-AU", resetOptions)).toBe(
        "30/03/2018 7:18:00 pm",
    );

    expect(datestring("2018-03-30 19:18", "de-DE", resetOptions)).toBe(
        "30.3.2018 19:18:00",
    );
});

Deno.test("datestring with invalid input", () => {
    expect(datestring("", "en-AU", resetOptions)).toBe("");
});

Deno.test("ago", () => {
    expect(ago("2018-03-30 19:18")).toMatch(/\d+ years ago/);
    
    expect(ago("2018-03-30 19:18", "2021-03-30")).toBe("3 years ago");
});
