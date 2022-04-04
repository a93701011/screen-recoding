const axios = require('axios');

for (let i = 150; i < 1427; i++) {
axios.get(`https://api.opensea.io/api/v1/asset/0x6e8Ca9F24De73344854C4E97a9eAa2fbfbC6E6F6/${i}/?force_update=true`)
  .then(function (response) {
    // handle success
    //console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}