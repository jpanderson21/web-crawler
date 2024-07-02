import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js"

async function main() {
    if (process.argv.length < 3) {
        console.log("Error: no base URL provided");
        return;
    } else if (process.argv.length > 3) {
        console.log("Error: more than one argument provided");
        return;
    }

    const baseURL = new URL(process.argv[2]);
    console.log(`Beginning at ${baseURL}`);

    const pages = await crawlPage(baseURL);
    printReport(pages);
}

main();
