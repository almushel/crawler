const {test, expect} = require("@jest/globals")
const {normalizeURL} = require("./crawl")

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