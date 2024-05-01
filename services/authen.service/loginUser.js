const { connectToDb } = require("../../db/connection");
const { User } = require("../../db/model/userModel");
const { mapError } = require("../../utils/apiError");
const { comparePass, generateJWT } = require("../../utils/security");

const loginUser = async ({ email, password }) => {
  connectToDb();
  const findUser = await User.findOne({ email });
  console.log(findUser);
  if (!findUser?.username) {
    throw mapError(401, "this email does not exist");
  }
  let compareResult = await comparePass(password, findUser?.password);
  if (compareResult) {
    let token = generateJWT({
      userId: findUser._id,
      username: findUser.username,
      role: findUser.role,
    });
    return { status: true, token };
  }
  throw mapError(401, "password incorrect");
};

module.exports = loginUser;
