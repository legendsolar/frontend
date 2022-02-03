const cheerio = require("cheerio");
const fs = require("fs");

const webflowFooter = fs.readFileSync("./scraped/webflow_footer.html");
const reactIndex = fs.readFileSync("./public/index.html");

const reactIndexDom = cheerio.load(reactIndex);
const webflowFooterDom = cheerio.load(webflowFooter);

// look for all a hrefs, make them link back to webflow site
webflowFooterDom("a").each((index, value) => {
    const link = webflowFooterDom(value).attr("href");
    const patternsToNotParse = /mailto|https|http/;
    if (!link.match(patternsToNotParse)) {
        const newLink = "https://www.legends.solar" + link;
        console.log(newLink);
        webflowFooterDom(value).attr("href", newLink);
    }
});

fs.writeFileSync(
    "./scraped/webflow_footer_parsed.html",
    webflowFooterDom("#FooterTransfer").html(),
    { flag: "w" }
);

reactIndexDom("#webflow-footer").replaceWith(
    `
<div id="webflow-footer">
${webflowFooterDom("#FooterTransfer").html()}
</div>
`
);

console.log(reactIndexDom.html());

fs.writeFileSync("./public/index.html", reactIndexDom.html(), { flag: "w" });

process.exit(0);
