import { test, expect } from "@jest/globals";
import { sortPages } from "./report.js";

test('(example.com, 2) comes before (example.com/hello, 1)', () => {
    const pages = {
        'example.com/hello': 1,
        'example.com': 2
    };
    const expected = [
        ['example.com', 2],
        ['example.com/hello', 1]
    ];
    expect(sortPages(pages)).toEqual(expected);
});

test('(example.com/hi, 2) comes after (example.com/hello, 2)', () => {
    const pages = {
        'example.com/hi': 2,
        'example.com/hello': 2
    };
    const expected = [
        ['example.com/hello', 2],
        ['example.com/hi', 2]
    ];
    expect(sortPages(pages)).toEqual(expected);
});
