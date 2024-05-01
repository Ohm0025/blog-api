const jwt = require("jsonwebtoken");
const { mapError } = require("../utils/apiError");
const getUserId = require("../services/authen.service/getUserId");

const checkUserAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      throw mapError(401, "unauthorized please login");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      throw mapError(401, "this account is unauthorized");
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        throw mapError(401, "session expired");
      }
      if (decode) {
        return decode;
      }
    });
    let getId = await getUserId(payload.userId);
    req.userId = getId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkUserAuth;
