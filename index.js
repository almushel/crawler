const {argv} = require("node:process");
const {crawlPage} = require("./crawl");

async function main() {
	console.log(argv);
	if (argv.length != 3) {
		console.log("Error: Invalid number of arguments. Usage: crawl [BASE_URL]");
		return;
	} else {
		console.log(`Starting web crawl at base URL: ${argv[2]}`);
	} 

	const result = await crawlPage(argv[2], argv[2], {})
	const pages = Object.entries(result).sort();

	console.log("Pages crawled: ");
	console.log("---------------");

	for (const p of pages) {
		console.log(`${p[0]}: ${p[1]}`);
	}

}

main();