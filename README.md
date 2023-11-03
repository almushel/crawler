# Crawler

A simple web crawler built with Node.js.

## Usage

Using crawler is straightforward. From the top level repo directory run:

```sh
npm start https://domainname.com
```

The program expects an `http://` or `https://` URL. Anything else, including a web address that ommits the protocol, will throw an error (for now). It will also fail to find any links that are created client side on page load (e.g. SPAs).