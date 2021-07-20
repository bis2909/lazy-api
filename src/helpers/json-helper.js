const fs = require('fs');

const parseJson = jsonURL => {
  let rawdata = fs.readFileSync(jsonURL);
  return JSON.parse(rawdata);
};

module.exports = {
  parseJson
};
