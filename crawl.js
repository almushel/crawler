const {JSDOM, ELEMENT_NODE} = require("jsdom");

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

function getLinksInNode(node, links) {
	for (n of node.childNodes) {
		if (n.nodeType == 1) { 
			if (n.nodeName == "A") {
				links.push(n); 
			}
			getLinksInNode(n, links);
		}
	}
	return links;
}

function getURLsFromHTML(htmlBody, baseURL) {
	let result = [];
	const dom = new JSDOM(htmlBody);
	let links = getLinksInNode(dom.window.document.body, []);
	for (const link of links) {
		let linkURL = null;
		try {
			const base = 
				link.href.startsWith("/") ?
				new URL(baseURL).origin : 
				(baseURL.endsWith("/") ? baseURL : baseURL+"/");

			linkURL = new URL(link.href, base);
		} catch(e) {
			console.log(e.message);
		}
			
		if (linkURL != null && !result.includes(linkURL.href)) {
			result.push(linkURL.href);
		}
	}

	return result;
}

async function crawlPage(baseURL, currentURL, pages) {
//	if (!currentURL.endsWith("/")) currentURL += "/";
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
		return pages;
	}

	if (!response.ok) {
		console.log(response.status+" "+response.statusText+": "+currentURL);
		return pages;
	}

	if (!response.headers.get("Content-Type").startsWith("text/html")) {
//		console.log("Invalid content type: "+response.headers.get("Content-Type"));
		return pages;
	}

	const body = await response.text();
	const links = getURLsFromHTML(body, currentURL);
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