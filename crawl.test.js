import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('https://blog.boot.dev/path/ normalizes to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('https://blog.boot.dev/path normalizes to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('http://BLOG.boot.dev/path/ normalizes to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('http://BLOG.boot.dev/path normalizes to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('getURLsFromHTML: testing one absolute path', () => {
    const html =
    `<html>
        <body>
            <a href="https://blog.boot.dev/page1"><span>Go to page1</span></a>
        </body>
    </html>`;
    expect(getURLsFromHTML(html, 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/page1']);
})

test('getURLsFromHTML: testing one relative path', () => {
    const html =
    `<html>
        <body>
            <a href="/page2"><span>Go to page2</span></a>
        </body>
    </html>`;
    expect(getURLsFromHTML(html, 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/page2']);
})

test('getURLsFromHTML: testing one external path', () => {
    const html =
    `<html>
        <body>
            <a href="http://www.example.com"><span>Go to example</span></a>
        </body>
    </html>`;
    expect(getURLsFromHTML(html, 'https://blog.boot.dev')).toEqual(['http://www.example.com/']);
})

test('getURLsFromHTML: testing multiple paths', () => {
    const html =
    `<html>
        <body>
            <a href="https://blog.boot.dev/page1"><span>Go to page1</span></a>
            <a href="/page2"><span>Go to page2</span></a>
            <a href="http://www.example.com"><span>Go to example</span></a>
        </body>
    </html>`;
    const expected = [
        'https://blog.boot.dev/page1',
        'https://blog.boot.dev/page2',
        'http://www.example.com/',
    ];
    expect(getURLsFromHTML(html, 'https://blog.boot.dev')).toEqual(expected);
})
