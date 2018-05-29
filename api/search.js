// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
const express = require("express");
const utility = require("utility");
const superagent = require("superagent");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
const app = express();
let scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.zillow.com/homes/recently_sold/Philadelphia-PA/apartment_duplex_type/"
  );
  await page.waitFor(1000);

  // Scrape
  // browser.close();
  const result = await page.evaluate(() => {
    // geolocation
    const latArr = Array.from(
      document.querySelectorAll(
        ".zsg-photo-card-content > span:nth-child(2) > meta:nth-child(1)"
      )
    ) // get node list
      .map(el => ({
        [el.getAttribute("itemprop")]: Number(el.getAttribute("content"))
      }));
    const lonArr = Array.from(
      document.querySelectorAll(
        ".zsg-photo-card-content > span:nth-child(2) > meta:nth-child(2)"
      )
    ) // get node list
      .map(el => ({
        [el.getAttribute("itemprop")]: Number(el.getAttribute("content"))
      }));
    // prices

    const priceArr = Array.from(
      document.querySelectorAll(".zsg-photo-card-status")
    ) // get node list
      .map(el => ({
        // regex
        // price: /\$[0-9]{0,},{0,1}[0-9]{0,}/.exec(el.innerText)[0], // match $100,000, $200 pattern
        // replace
        price: el.innerText.replace("SOLD: ", "") // match $100,000, $200 pattern
      }));
    // info
    const infoArr = Array.from(
      document.querySelectorAll(".zsg-photo-card-info")
    ).map(el => ({ info: el.innerText }));
    // sold date
    const soldDateArr = Array.from(
      document.querySelectorAll(".zsg-list_inline.zsg-photo-card-badge")
    ).map(el => ({ date: el.innerText.replace("Sold ", "") }));
    // address
    const addressArr = Array.from(
      document.querySelectorAll(".zsg-photo-card-address")
    ).map(el => ({ address: el.innerText }));
    // assemble
    console.log(latArr);
    const response = latArr.map((item, index) => ({
      ...latArr[index]
      // ...lonArr[index],
      // ...priceArr[index],
      // ...infoArr[index],
      // ...soldDateArr[index],
      // ...addressArr[index],
    }));
    console.log(response, "response");
    return response;
  });

  return result;
};
// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(5000, () => {
  console.log("app is listening at port 5000");
});

app.get("/api/market", (req, res) => {
  console.log("get request", req);
  scrape()
    .then(data => res.send(data))
    .catch(err => console.log(new Error(err)));
});
