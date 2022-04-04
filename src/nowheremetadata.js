const fs = require("fs");
const imageipfs = "QmQQJj5gm3JcZRKihLoVCU8ooULasns7n4m28p5ohPvZoC";
const animationipfs = "QmdVuKASCfHMxTf6MggcXPsubWCubf8G4tjotaeT2ucXNT"

const data = fs.readFileSync("./json/nobody.json")
let dna = JSON.parse(data);

// 'attributes": [{"trait_type": "skin", "value": "#E8E1D1"}, {"trait_type": "left gaze", "value": "dot"}, {"trait_type": "right gaze", "value": "coin"}, {"trait_type": "mask", "value": "pt up"}, {"trait_type": "breathe", "value": "whole"}, {"trait_type": "XS", "value": "why"}, {"trait_type": "environment", "value": "Here"}]}'

const trait_json = JSON.parse(fs.readFileSync("./json/nowhere_trait.json"));

trait_type = ['volumatomy', 'fog', 'xs', 'architexture','mental climate']
dna_pos = [1,2,3,4,6]

for (let i = 0; i < 3210; i++) {

    const dna_array = dna[i].split("");

    let nft = {};

    // nft['name'] = `Nowhere #${dna[i]}`;
    nft['name'] = `Nowhere #${i}-${dna[i]}`;
    // nft['image'] = `https://gateway.pinata.cloud/ipfs/${imageipfs}`;
    nft['image'] = `https://gateway.pinata.cloud/ipfs/${imageipfs}/${i}_${dna[i]}_nowhere.svg`;
    nft['description'] = "1 of 3210 Interactive by hover, click and touch NFTs. \n\n On-Chain Trait-mapped to Nobody.\n\n Surreality of Nowhere. \n\n Think of it where you will.";
    nft['external_url'] = 'http://nobodyeth.art';
    nft['animation_url'] = `https://gateway.pinata.cloud/ipfs/${animationipfs}/${i}_${dna[i]}_nowhere.html`;


    let attributes = [];

    trait_type.forEach((value, index) => {
        const obj_json = {};
        obj_json['trait_type'] = value
        obj_json['value'] = trait_json[value][dna_array[dna_pos[index]]]
        attributes.push(obj_json)
    }
    )
    nft['attributes'] = attributes;

    // fs.writeFileSync(`./nowhere/metadata/${dna[i]}`, JSON.stringify(nft), function (err) {
    fs.writeFileSync(`./nowhere/metadata/${dna[i]}`, JSON.stringify(nft), function (err) {
    
        if (err) {
            return console.log(err);
        }
        //   console.log("write : " + filename );
    });


};



