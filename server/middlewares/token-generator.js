const jwt = require("jsonwebtoken");

const SECRETE_KEY = require("./secrete");

const getToken = function(email, id) {
  return jwt.sign({ email: email, id: id }, SECRETE_KEY, {
    expiresIn: "1h"
  });
};

module.exports = getToken;
