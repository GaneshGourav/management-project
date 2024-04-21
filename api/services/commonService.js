const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

module.exports = {
  verifyAuthToken,
};
// Function to verify auth token
async function verifyAuthToken(headerToken) {
  return new Promise(async function (resolve, reject) {
    try {
      const token = headerToken;
      if (token) {
        const decoded = await jwt.verify(token, SECRET_KEY);

        if (decoded) {
          return resolve({
            id: decoded.user_id,
          });
        } else {
          return reject("Unauthorizd!");
        }
      } else {
        return reject("Unauthorizd!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}
