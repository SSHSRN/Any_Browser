// var browser = "google";

// function load(s) {
//     window.location.assign(s);
// }

// function getSearchVal(){
//     let s_txt = document.getElementById("search_txt").value;
//     return s_txt;
// }

// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') {
//         Search();
//     }
// });

// function Search() {
//     let s = getSearchVal();
//     if(s=="porn"){
//         window.alert("porn watcher detected.");
//         return;
//     }
//     // window.location.assign('https://www.bing.com/search/search?q='+s);
//     a = document.getElementById("searchBAR");
//     a.src = 'https://www.bing.com/search/search?q='+s;
// }

const puppeteer = require("puppeteer"); // ^13.5.1

let browser;
(async () => {
  const searchQuery = "google";

  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto("https://www.google.com/", {waitUntil: "domcontentloaded"});
  await page.waitForSelector('input[aria-label="Search"]', {visible: true});
  await page.type('input[aria-label="Search"]', searchQuery);
  await Promise.all([
    page.waitForNavigation(),
    page.keyboard.press("Enter"),
  ]);
  await page.waitForSelector(".LC20lb", {visible: true});
  const searchResults = await page.$$eval(".LC20lb", els => 
    els.map(e => ({title: e.innerText, link: e.parentNode.href}))
  );
  console.log(searchResults);
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close())
;