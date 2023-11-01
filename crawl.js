function normalizeURL(url) {
	const result = new URL(url)
	return result.hostname;
}

module.exports = {
	normalizeURL
}