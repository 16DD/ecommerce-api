//--Authentication API
const JWT = require("jsonwebtoken");

const createTokenPair = (payload, publicKey, privateKey) => {
  try {
    //-- accessToken and refreshToken
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: "1 day",
    });
    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "1 day",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createTokenPair,
};
