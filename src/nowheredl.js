const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const timer = ms => new Promise(res => setTimeout(res, ms))
const dna = fs.readFileSync("./csv/nowhere_dna.csv", 'utf8')
const dna_list = dna.split('\r\n').map(a => a.trim());
const downloadPath = path.resolve('./download');

const options = {
  headless: false, // The browser is visible
  ignoreHTTPSErrors: true,
  // args: [`--window-size=${options.width},${options.height}`],
  defaultViewport: {
    width: 1080,
    height: 1080
  } // new option
};



async function screenShot(a) {
  const subfolder = `volumn=${dna_list[a][1]}`

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  
 try {

    let dt = new Date().getTime()
    await page.goto(`http://localhost:8080?tokenid=${a}&dna=${dna_list[a]}&dt=${dt}`);
    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: downloadPath }); // allow multiple download
  
    console.log("Waited 2s");
    await timer(3000);
    // await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: '../Nowhere/Png' });
    
    await page.screenshot({ path: `./nowhere/png/${subfolder}/${a}_${dna_list[a]}_nowhere.png` });
    await browser.close();
    let fn = `${a}_${dna_list[a]}_nowhere.html`
    let fn2 = `${a}_${dna_list[a]}_nowhere.svg`
    await moveFile(`C:/Users/adminkaren/Documents/screenshot/download/${fn}`, `C:/Users/adminkaren/Documents/screenshot/nowhere/html/${subfolder}/${fn}`)
    await moveFile(`C:/Users/adminkaren/Documents/screenshot/download/${fn2}`, `C:/Users/adminkaren/Documents/screenshot/nowhere/svg/${subfolder}/${fn2}`)

  }
  catch {
    await browser.close();
  }
 
};


async function task(i) { // 3
  await timer(500);
  await screenShot(i)
  console.log(`Task ${i} done!`);
}

async function runShot() {
  for (let i = 752; i < 3210 ; i++) {
    // if(dna_list[i][1]=='6'){
    await task(i);
  // }

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