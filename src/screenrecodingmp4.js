const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');


const Config = {
  recordDurationLimit: 3,
  fps: 25,
  // videoFrame: {
  //   width: 1080,
  //   height: 1080,
  // },
  // aspectRatio: '4:3',
};

const options = {
  defaultViewport: {
    width:1080,
    height:1080
  }
};

(async () => {
  
  
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page, Config);
  await page.goto('http://localhost:8080');
    await recorder.start('simple.mp4');

  await recorder.stop();
  await browser.close();
})();