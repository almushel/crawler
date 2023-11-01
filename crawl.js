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
module.exports = {
	normalizeURL, getURLsFromHTML
}