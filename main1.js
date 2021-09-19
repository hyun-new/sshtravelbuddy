const puppeteer = require('puppeteer');
const express = require('express')
const app = express()

const url = "https://graphics.reuters.com/world-coronavirus-tracker-and-maps/countries-and-territories/south-korea/";
var data ="";
async function run (res,search) {
  const browser = await puppeteer.launch({
  'args' : [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#__next > div > div.styles_component__2o7cn > div.styles_component__Osi10 > div > div.searchBox > input', {visible: true});
    await page.type('#__next > div > div.styles_component__2o7cn > div.styles_component__Osi10 > div > div.searchBox > input', search)

    await page.keyboard.press('ArrowDown');
    await Promise.all([
   page.waitForNavigation(),
   page.keyboard.press("Enter"),
 ]);
    await page.waitForSelector("#__next > div > article > section:nth-child(3) > div.styles_component__2s5YK > div:nth-child(2)", {visible: true});
    data = await page.evaluate(() => document.querySelector('#__next > div > article > section:nth-child(3) > div.styles_component__2s5YK > div:nth-child(2)').outerHTML);
      browser.close();
      await res.send(data);

}
async function run1 (res,search) {
  const browser = await puppeteer.launch({
  'args' : [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
});
  const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#__next > div > div.styles_component__2o7cn > div.styles_component__Osi10 > div > div.searchBox > input', {visible: true});
    await page.type('#__next > div > div.styles_component__2o7cn > div.styles_component__Osi10 > div > div.searchBox > input', search)

    await page.keyboard.press('ArrowDown');
    await Promise.all([
   page.waitForNavigation(),
   page.keyboard.press("Enter"),
 ]);
    await page.waitForSelector("#__next > div > article > div > section:nth-child(2) > p > strong:nth-child(2)", {visible: true});
    const vac_rate= await page.evaluate(() => document.querySelector('#__next > div > article > div > section:nth-child(2) > p > strong:nth-child(2)').outerHTML);
    await page.waitForSelector("#__next > div > article > section:nth-child(2) > div > div.clearfix > div.title-container > div.status-text.styles_component__YO9EU > p", {visible: true});
    const doc2= await page.evaluate(() => document.querySelector('#__next > div > article > section:nth-child(2) > div > div.clearfix > div.title-container > div.status-text.styles_component__YO9EU').outerHTML);
const country_name= await page.evaluate(() => document.querySelector('#__next > div > article > section:nth-child(2) > div > div.clearfix > div.title-container > h1').outerHTML);

    var template =`<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">


<div class="w3-container">

  <div class="w3-card-4" style="width:70%">
    <header class="w3-container w3-light-grey">
      <p>Result For...<b>${country_name}</b></p>
    </header>
    <div class="w3-container">
      <hr>
      <h4 style ="text-align:center">${vac_rate}</h4>


    </div>
    <button class="w3-button w3-block w3-pale-blue">Vaccination Rate</button>
    <div class="w3-container">
      <hr>
      <style>
        h1 {
          font-size: 18px;
        }
        p {
          font-size: 14px;
        }
        .svg-inline--fa {
          max-width:20px;
        }

      </style>
      <h2 style ="text-align:center">${doc2}</h2>
      <br>

    </div>
  </div>
</div>`
  browser.close();
    await res.send(template);

}
app.get('/', function (req, res) {
  let search = req.query.search;

  if(search) {
      search.replace("_"," ");
    run(res,search);
  } else {
      res.send("?search = ?");
  }

})
app.get('/vaccine', function (req, res) {
  let search = req.query.search;
  if(search) {
      search.replace("_"," ");
    run1(res,search);
  } else {
      res.send("?search = ?");
  }
})
app.listen(process.env.PORT|| 3000, function () {
  console.log('Example app listening on port 3000!')
});
