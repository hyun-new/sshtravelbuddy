const puppeteer = require('puppeteer');
var http = require('http');
const url = "https://www.google.com/search?q=kr+covid+cases";
var data ="";
async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
  //  var dropdown_week = await page.waitForSelector('#ow233 > div:nth-child(1) > div > div > div');
    //await page.click('#_GbdGYdOLJt-pqtsPrrOFkAE1456 > div > div > div:nth-child(3) > g-popup > div:nth-child(1)');
    await page.screenshot({path: 'screenshot.png'});

    data = await page.evaluate(() => document.querySelector('#TSn4rb > div > div.PDn9ad.iiUHhf > div.ahjcie').outerHTML);

    return data;
    browser.close();
}
run();
http.createServer(function (req, res) {


  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(data);
}).listen(3000);
