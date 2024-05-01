const createUser = require("../services/authen.service/createUser");
const loginUser = require("../services/authen.service/loginUser");
const { modifyMongoError } = require("../utils/apiError");

exports.userRegister = async (req, res, next) => {
  try {
    const { username, email, password, img } = req.body;
    await createUser({ username, email, password, img });
    res.status(201).json({ message: "create user" });
  } catch (err) {
    console.log(err);
    next(modifyMongoError(err));
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    if (result.status) {
      return res
        .status(200)
        .json({ message: "login success", token: result.token });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
