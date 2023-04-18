const { gotScraping } = require("got-scraping");
const axios = require("axios");

main();

async function main() {
    const response = await axios.get("https://www.countdown.co.nz/api/v1/dynamic-content/product-groups/169513/products?productGroupSort=515173%2C754785%2C277568%2C687785%2C133145&maxProductsCount=19", {
            "headers": {
                "host": "https://www.countdown.co.nz/",
                "accept": "application/json, text/plain, */*",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "expires": "Sat, 01 Jan 2000 00:00:00 GMT",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "x-requested-with": "OnlineShopping.WebApp",
                "Referer": "https://www.countdown.co.nz/shop/specials",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
            },
            "data": null,
            "method": "GET"
        }).then((e) => console.log(e))
        .catch((e) => console.log(e.message));

    console.log(response);

}