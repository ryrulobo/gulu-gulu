const { User } = require("../models");

async function authz(req, res, next) {
  try {
    const UserId = +req.user.id;
    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      throw { name: "User not found" };
    } else if (UserId != user.id) {
      throw { name: "Forbidden" };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authz;
