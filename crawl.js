const {JSDOM} = require("jsdom");

function normalizeURL(url) {
	try {
		const result = new URL(url);
		let path = result.pathname;
		if (path.endsWith("/")) {
			path = path.substring(0, path.length-1);
		}
		return result.hostname+path;
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
		if (link.href.startsWith("/")) {
			result.push(`${baseURL}${link.href.substring(1)}`);
		} else {
			result.push(link.href);
		}
	}

	return result;
}

async function crawlPage(baseURL, currentURL, pages) {
	// TO-DO: Handle URLs with omitted protocol (https://)	
	const nURL = normalizeURL(currentURL);
	if (pages[nURL] != undefined) {
		pages[nURL]++;
		return pages;
	}

	if (currentURL == baseURL) pages[nURL] = 0;
	else pages[nURL] = 1;

	let response;
	try {
		response = await fetch(currentURL);
	} catch (e) {
		console.log(e.message);
		return;
	}

	if (!response.ok) {
		console.log(response.status + ": " + response.statusText);
		return;
	}

	if (!response.headers.get("Content-Type").startsWith("text/html")) {
		console.log("Invalid content type: "+response.headers.get("Content-Type"));
		return;
	}

	const body = await response.text();
	const links = getURLsFromHTML(body, baseURL);
	for (const link of links) {
		if (link.startsWith(baseURL)) {
			await crawlPage(baseURL, link, pages);			
		}
	}

	return pages;
}

module.exports = {
	normalizeURL, getURLsFromHTML, crawlPage
}