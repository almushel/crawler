const {argv} = require("node:process");
const {crawlPage} = require("./crawl");

function main() {
	console.log(argv);
	if (argv.length != 3) {
		console.log("Error: Invalid number of arguments. Usage: crawl [BASE_URL]");
		return;
	} else {
		console.log(`Starting web crawl at base URL: ${argv[2]}`);
	} 

	crawlPage(argv[2], {});
}

main();