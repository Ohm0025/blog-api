const { connectToDb } = require("../../db/connection");
const { User } = require("../../db/model/userModel");
const { hashPassword } = require("../../utils/security");

const createUser = async ({ username, email, password, img }) => {
  connectToDb();
  const newUser = await User({
    username,
    email,
    password,
    img,
  });
  await newUser.validate();
  let hashPass = await hashPassword(password);
  newUser.password = hashPass;
  await newUser.save();
};

module.exports = createUser;
