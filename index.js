const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 }); // Set the desired viewport size

  await page.goto("https://swap.defillama.com");

  await page.waitForSelector("#react-select-2-input");
  await page.type("#react-select-2-input", "Arbitrum One");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.$eval(".css-lv0ed5", (input) => (input.value = ""));
  await page.type(".css-lv0ed5", "12");

  const select_wbtc = await page.$x(
    "/html/body/div[1]/div/div/div[2]/main/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button"
  );
  await select_wbtc[0].click();
  await page.waitForSelector(".css-bls73e");
  await page.type(".css-s1d1f4", "WBTC");
  const wbtc = await page.waitForXPath(
    '//span[contains(text(), "Wrapped BTC (WBTC)")]'
  );
  await wbtc.click();

  const select_usdc = await page.$x(
    "/html/body/div[1]/div/div/div[2]/main/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/button"
  );
  await select_usdc[0].click();
  await page.waitForSelector(".css-bls73e");
  await page.type(".css-s1d1f4", "USDC");
  const usdc = await page.waitForXPath(
    '//span[contains(text(), "USD Coin (USDC)")]'
  );
  await usdc.click();

  await page.waitForSelector(".sc-18d0abec-0.knYyMy.RouteWrapper");
  const secondOption = await page.$x(
    '(//div[starts-with(@class, "sc-18d0abec-1 itSiES")])[2]'
  );
  await secondOption[0].click();
})();
