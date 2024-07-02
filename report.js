function sortPages(pages) {
    const pageEntries = Object.entries(pages);
    const sortedPages = pageEntries.sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
    });
    return sortedPages;
}

function printReport(pages) {
    console.log('\nBeginning report...\n');

    const sortedPages = sortPages(pages)
    for (const pageEntry of sortedPages) {
        console.log(`Found ${pageEntry[1]} internal link${pageEntry[1] > 1 ? 's' : ''} to ${pageEntry[0]}`);
    }
}

export { printReport, sortPages };
