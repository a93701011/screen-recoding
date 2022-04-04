
const fs = require('fs');
const jsdom = require("jsdom");


let filenames=[];
filenames = fs.readFileSync('./json/nobody.json','utf-8')
nobodytoken = JSON.parse(filenames);

for (let i = 3012; i< 3210; i++){
console.log(i);


const htmlString = fs.readFileSync(`./nowhere/html/${i}_${nobodytoken[i]}_nowhere.html`,'utf-8');

//var newstr = htmlString.replace('"options":{"start":"click","hover":"null","click":', '"options":{"start":"onload","hover":"null","click":');
let newstr = htmlString.replace('var movex = (0 - (mouseX - winowinnerwidth/2 ) / winowinnerwidth) * speed * 2','let movex = -1 * mouseX / 450 * speed')

const dom = new jsdom.JSDOM(newstr);


//var elem = dom.window.document.createElement('script');
//    elem.innerHTML = 'svgator_animation();';

//dom.window.document.body.appendChild(elem);

//dom.window.document.body.style.backgroundColor ="rgb(255,255,255)";
//dom.window.document.querySelector("svg").style.backgroundColor ="rgb(255,255,255)";

fs.writeFileSync(`./nowhere/htmlnew/${i}_${nobodytoken[i]}_nowhere.html` ,dom.window.document.documentElement.outerHTML, function (err) {
    if (err)
        console.log(err);
    else
        console.log('Write operation complete.');
      });

}

function createElement( str ) {
    var frag = document.createDocumentFragment();

    var elem = document.createElement('div');
    elem.innerHTML = str;

    while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}