const User = require("../models/users.js");

module.exports = {
  isUserExist,
};

// Function to select first data from db
async function isUserExist(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const userExist = await User.findOne({ _id: id });
      if (userExist) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    } catch (error) {
      return reject(error);
    }
  });
}
