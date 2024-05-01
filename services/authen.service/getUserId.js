const { connectToDb } = require("../../db/connection");
const { User } = require("../../db/model/userModel");
const { mapError } = require("../../utils/apiError");
const { comparePass, generateJWT } = require("../../utils/security");

const getUserId = async (userId) => {
  connectToDb();
  const findUser = await User.findOne({ _id: userId });
  if (!findUser?.username) {
    throw mapError(401, "this user does not exist");
  }
  return findUser._id;
};

module.exports = getUserId;
