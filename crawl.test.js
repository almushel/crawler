const {test, expect} = require("@jest/globals")
const {normalizeURL, getURLsFromHTML} = require("./crawl")

test(
	"removes https://", () => {
		expect(normalizeURL("https://www.test.com")).toBe("www.test.com")
	} 
)

test(
	"removes http://", () => {
		expect(normalizeURL("http://www.test.com")).toBe("www.test.com")
	} 
)

test(
	"removes http:// and trailing slash", () => {
		expect(normalizeURL("http://www.test.com/")).toBe("www.test.com")
	} 
)

const HTML_BODY = `
	<html>
	<head></head>

	<a href="/test/"></a>	
	<a href="/test/"></a>	
	<a href="/test/"></a>
	<a href="/test/"></a>
	
	</html>	
`
const urlList = [
	"test.com/test/",
	"test.com/test/",
	"test.com/test/",
	"test.com/test/",
]

test(
	"gets absolute links from HTML", () => {
		expect(getURLsFromHTML(HTML_BODY, "test.com")).toEqual(urlList);
	} 
)

test(
	"gets ALL links from HTML", () => {
		expect(getURLsFromHTML(HTML_BODY, "test.com").length).toBe(4);
	} 
)