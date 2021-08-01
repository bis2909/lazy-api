// TODO: install bcrypt ---> `npm i bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

function doHash(value) {
  if (!value) { throw new Error('Value is empty'); }

  const salt = bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(value, salt);
}

function doCompare(value, hash) {
  return bcrypt.compareSync(value, hash);
}

module.exports = {
  doHash,
  doCompare
};
