const {JSDOM} = require("jsdom");

function normalizeURL(url) {
	try {
		const result = new URL(url);
		return result.hostname;
	} catch (e) {
		console.log(e.message);
		return url;
	}
}

function getURLsFromHTML(htmlBody, baseURL) {
	let result = [];
	const dom = new JSDOM(htmlBody);
	const links = dom.window.document.querySelectorAll("a")
	for (let link of links) {
		result.push(`${baseURL}${link.href}`);
	}

	return result;
}

async function crawlPage(baseURL, dict) {
	// TO-DO: Handle URLs with omitted protocol (https://)	

	let response;
	try {
		response = await fetch(baseURL);
	} catch (e) {
		console.log(e.message);
		return;
	}

	if (!response.ok) {
		console.log(response.status + ": " + response.statusText);
		return;
	}

	if (!response.headers.get("Content-Type").startsWith("text/html")) {
		console.log("Invalid content type");
		return;
	}

	const body = await response.text();
	console.log(body);
}

module.exports = {
	normalizeURL, getURLsFromHTML, crawlPage
}