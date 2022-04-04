const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
const timer = ms => new Promise(res => setTimeout(res, ms))
const dna = fs.readFileSync("./csv/nowhere_dna.csv", 'utf8')
const dna_list = dna.split('\r\n').map(a => a.trim());

const Config = {
  recordDurationLimit: 4,
  fps: 25,
  // videoFrame: {
  //   width: 2080,
  //   height: 2080,
  // }
};

const options = {
  defaultViewport: {
    width:2080,
    height:2080
  }
};

async function screenShot(a)  {
  
  
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page, Config);
  await page.goto(`http://localhost:8080/html4gif/${a}_${dna_list[a]}_nowhere.html`);
  await recorder.start(`./nowhere/mp4/${a}_${dna_list[a]}_nowhere.mp4`);
  await timer(5000);
  await recorder.stop();
  await browser.close();
}


async function task(i) { // 3
  await timer(1000);
  await screenShot(i)
  console.log(`Task ${i} done!`);
}

async function runShot() {
  for (let i = 500; i < 515 ; i++) {
    await task(i)
  }
}

runShot();