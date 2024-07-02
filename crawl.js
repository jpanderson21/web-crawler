import { JSDOM } from 'jsdom';
import fetch from "node-fetch";

function normalizeURL(urlStr) {
    const url = new URL(urlStr);
    const simplified = url.hostname + url.pathname;
    return simplified.replace(/\/+$/, ''); // remove any trailing slash
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            const href = anchor.href;

            try {
                const url = new URL(href, baseURL)
                urls.push(url.toString());
            } catch(err) {
                console.log(`${err.message}: ${href}`);
            }
        }
    }

    return urls;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    if (baseURL.hostname !== currentURL.hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);
    if (normalizedURL in pages) {
        pages[normalizedURL]++;
    } else {
        console.log(`Crawling ${normalizedURL}...`);
        pages[normalizedURL] = 1;
        const parsedURLs = await parseURL(currentURL.href);
        if (parsedURLs) {
            for (const url of parsedURLs) {
                const urlObj = new URL(url);
                pages = await crawlPage(baseURL, urlObj, pages);
            }
        }
    }

    return pages;
}

async function parseURL(urlStr) {
    let response;
    try {
        response = await fetch(urlStr);
    } catch(err) {
        throw new Error(`Error fetching URL: ${err.message}`);
    }

    if (response.status >= 400) {
        console.log(`Error: HTTP response code ${response.status}`);
        return;
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("text/html")) {
        console.log(`Error: content-type "${contentType}" is not "text/html"`);
        return;
    }

    const htmlBody = await response.text();
    const urls = getURLsFromHTML(htmlBody, urlStr);

    return urls;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
