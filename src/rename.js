const { readdirSync, rename } = require('fs');
const fs = require('fs');


let filenames=[];
filenames = fs.readFileSync('./json/nobody.json','utf-8')
nobodytoken = JSON.parse(filenames);

for (let i = 0; i< 3210; i++){
//console.log(i);

const oldPath = `./nowhere/svg/${i}_${nobodytoken[i]}_nowhere.svg`;

// lowercasing the filename
const newPath = `./nowhere/svgrename/${i}.svg`;

// Rename file
rename(
  oldPath,
  newPath,
  err => console.log(err)
);
}