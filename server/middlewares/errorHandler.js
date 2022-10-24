function errorHandler(err, req, res, next) {
  console.log("Error", err);

  let errCode = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    errCode = 400;
    message = err.errors[0].message;
  } else if (err.name === "Username is required") {
    errCode = 400;
    message = "Username is required";
  } else if (err.name === "Email is required") {
    errCode = 400;
    message = "Email is required";
  } else if (err.name === "Password is required") {
    errCode = 400;
    message = "Password is required";
  } else if (err.name === "Username must be unique") {
    errCode = 400;
    message = "Username must be unique";
  } else if (err.name === "Email must be unique") {
    errCode = 400;
    message = "Email must be unique";
  } else if (err.name === "Url is required") {
    errCode = 400;
    message = "Url is required";
  } else if (err.name === "Already bookmarked") {
    errCode = 400;
    message = "You already bookmark this news";
  } else if (err.name === "Invalid token" || err.name === "JsonWebTokenError") {
    errCode = 401;
    message = "Invalid token";
  } else if (err.name === "Invalid email/password") {
    errCode = 401;
    message = "Invalid email/password";
  } else if (err.name === "Unauthorized") {
    errCode = 403;
    message = "Unauthorized activity";
  } else if (err.name === "Forbidden") {
    errCode = 403;
    message = "Forbidden activity";
  } else if (err.name === "User not found") {
    errCode = 404;
    message = "User not found";
  } else if (err.name === "Bookmark not found") {
    errCode = 404;
    message = "Bookmark not found";
  }

  res.status(errCode).json({ message });
}

module.exports = errorHandler;
