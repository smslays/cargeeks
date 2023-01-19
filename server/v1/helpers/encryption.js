const bcrypt = require("bcryptjs");
function encrypt(plaintext) {
  try {
    return bcrypt.hashSync(plaintext);
  } catch (err) {
    console.log(err);
  }
  return;
}

function compare(plain, hash) {
  try {
    return bcrypt.compareSync(plain, hash);
  } catch (err) {
    console.log(err);
  }
  return false;
}

module.exports = { encrypt, compare };
