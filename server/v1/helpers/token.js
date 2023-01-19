const jwt = require("jsonwebtoken");
function generateToken(payload, expiry = 60 * 15) {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn: expiry });
  } catch (e) {
    console.log(e);
  }
}

function verifyToken(token) {
  return jwt.verify(token, process.env.KEY);
}
module.exports = { generateToken, verifyToken };
