const puppeteer = require('puppeteer');
const fs = require('fs');
const GIFEncoder = require('gifencoder');
const PNG = require('png-js');

function decode(png) {
  return new Promise(r => {png.decode(pixels => r(pixels))});
}

async function gifAddFrame(page, encoder) {
  const pngBuffer = await page.screenshot({ clip: { width: 1080, height: 1080, x: 0, y: 0 } });
  const png = new PNG(pngBuffer);
  await decode(png).then(pixels => encoder.addFrame(pixels));
}
const timer = ms => new Promise(res => setTimeout(res, ms))
const dna = fs.readFileSync("./csv/nowhere_dna.csv", 'utf8')
const dna_list = dna.split('\r\n').map(a => a.trim());



const options = {
  headless: false, // The browser is visible
  ignoreHTTPSErrors: true,
  // args: [`--window-size=${options.width},${options.height}`],
  defaultViewport: {
    width: 1080,
    height: 1080,
    slowMo: 0
  } // new option
};

async function screenShot(a) {
  //   const browser = await puppeteer.launch();
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  try {

    let dt = new Date().getTime()
    await page.goto(`http://localhost:8080/html4gif/${a}_${dna_list[a]}_nowhere.html`);

    console.log("Waited 2s");
    await timer(2000);
  
    // record gif
    let encoder = new GIFEncoder(1080, 1080);
    
    encoder.createWriteStream()
      .pipe(fs.createWriteStream(`./nowhere/gif/${a}_${dna_list[a]}_nowhere.gif`));

    // setting gif encoder  
    encoder.start();
    encoder.setRepeat(0);
    //encoder.setFrameRate(12);
    encoder.setDelay(100);
    encoder.setQuality(10); // default

    for (let i = 0; i < 40; i++) {
      await gifAddFrame(page, encoder);
    }

    // finish encoder, test.gif saved   
    encoder.finish();
    await browser.close();

  }
  catch {
    await browser.close();
  }
};


async function task(i) { // 3
  await timer(2000);
  await screenShot(i)
  console.log(`Task ${i} done!`);
}

async function runShot() {
  for (let i = 500; i < 505; i++) {
    await task(i)
  }
}

function moveFile(fromPath, toPath) {
  return new Promise(function (resolve, reject) {
    fs.rename(fromPath, toPath, function (err) {
      if (err) {
        reject(new Error('File did not move.'));
        throw err;
      } else {
        console.log('File moved');
        resolve();
      }
    });
  });
}

function checkFile(path) {
  return new Promise(function (resolve, reject) {
      fs.access(path, fs.F_OK, (err) => {
          if (err) {
              reject(new Error(err));
          }
  
          //file exists
          console.log('File exists');
          resolve();
      });
  });
}

runShot();