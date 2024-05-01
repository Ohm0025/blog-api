exports.notFound = (req, res, next) => {
  const err = new Error(`Path ${req.originalUrl} not found in server`);
  err.statusCode = 404;
  next(err);
};

exports.apiError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.message || "fail in internal server";
  res.status(err.statusCode).json({ message: err.status });
};

exports.mapError = (statusCode, msg) => {
  let err = new Error();
  err.statusCode = statusCode;
  err.message = msg;
  return err;
};

exports.modifyMongoError = (err) => {
  let msg = err.errmsg;
  if (msg?.includes("duplicate key")) {
    err.statusCode = 401;
    let key_dup = Object.keys(err.keyPattern);
    err.message = `this ${key_dup} already exist, please use another one`;
  }
  if (err.message.includes("validation failed")) {
    err.statusCode = 401;
    err.message = `the ${Object.keys(err.errors)[0]} is not valid`;
  }
  return err;
};
