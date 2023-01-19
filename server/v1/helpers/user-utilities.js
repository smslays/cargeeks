// lodash
const _ = require("lodash");
//while sending resp to client password shouldnt go
function pickUser(object) {
  return _.pick(object, [
    " userId",
    "_id",
    "name",
    "mobile",
    "email",
    "address",
    "pan",
    "status",
    "verified",
    "role",
    "avatar",
    "gender",
    "dob",
    "occupation",
  ]);
}

function pickUsersArray(userArr) {
  return _.map(userArr, (user) => {
    return pickUser(user);
  });
}
module.exports = { pickUser,pickUsersArray };
