const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashPassword = async (plainPass) => {
  const hash = await bcrypt.hash(plainPass, 10);
  return hash;
};

exports.generateJWT = (payload) => {
  let privateKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, privateKey, { expiresIn: "2d" });
  return token;
};

exports.comparePass = async (plainPass, hash) => {
  const result = await bcrypt.compare(plainPass, hash);
  return result;
};
