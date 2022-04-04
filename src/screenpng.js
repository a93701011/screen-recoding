const puppeteer = require('puppeteer');
// const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

const fullPageScreenshot = require('puppeteer-full-page-screenshot');
const { SingleEntryPlugin } = require('webpack');
// import fullPageScreenshot from 'puppeteer-full-page-screenshot';
// const Config = {
//   recordDurationLimit: 10,
// };
const delay = ms => new Promise(res => setTimeout(res, ms));
const options={
  headless: false, // The browser is visible
  ignoreHTTPSErrors: true,
  // args: [`--window-size=${options.width},${options.height}`],
  defaultViewport: {
      width:2160,
      height:2160
    } // new option
};


(async  () => {
//   const browser = await puppeteer.launch();

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');
  await delay(1000);
  console.log("Waited 2s");

  await page.screenshot({path: './nowherepng_'+ new Date().getTime()+'.png'});
  //await browser.close();
  //await fullPageScreenshot(page, { path: './nowherepng2.png' });
  await browser.close();

//   const recorder = new PuppeteerScreenRecorder(page,Config);
//   await recorder.start('simple.mp4'); 
//   await page.goto('https://ipfs.io/ipfs/QmcnVD7YJzZQDm96Bdzc1m4XJGPo7NMDb3DuHriWBwZFEz/13111111412615200.html');
//   await recorder.stop();
//   await browser.close();
})();