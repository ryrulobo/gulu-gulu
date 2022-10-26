const { User, Bookmark } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken, decodeToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username) throw { name: "Username is required" };
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const emailCheck = await User.findOne({ where: { email } });
      if (emailCheck) throw { name: "Email must be unique" };

      const usernameCheck = await User.findOne({ where: { username } });
      if (usernameCheck) throw { name: "Username must be unique" };

      await User.create({ username, email, password });
      const findUser = await User.findOne({ where: { email } });

      // Login
      const payload = {
        id: findUser.id,
        username: findUser.username,
      };
      res.status(200).json({
        access_token: signToken(payload),
        UserId: +findUser.id,
        loggedInUsername: findUser.username,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) throw { name: "Invalid email/password" };

      const validatePassword = comparePassword(password, findUser.password);
      if (!validatePassword) throw { name: "Invalid email/password" };

      const payload = {
        id: findUser.id,
        username: findUser.username,
      };
      res.status(200).json({
        access_token: signToken(payload),
        UserId: findUser.id,
        loggedInUsername: findUser.username,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const UserId = +req.user.id;
      const { url, datePublished, provider, thumbnail, name, description } =
        req.body;
      if (!url) throw { name: "Url is required" };
      const checkBookmark = await Bookmark.findOne({
        where: {
          UserId,
          url,
        },
      });
      if (checkBookmark) throw { name: "Already bookmarked" };

      await Bookmark.create({
        UserId,
        url,
        datePublished,
        provider,
        thumbnail,
        name,
        description,
      });
      res.status(200).json({ message: "Bookmark successfuly added" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const UserId = +req.user.id;
      const { url } = req.body;
      if (!url) throw { name: "Url is required" };
      const checkBookmark = await Bookmark.findOne({
        where: {
          UserId,
          url,
        },
      });
      if (!checkBookmark) throw { name: "Bookmark not found" };

      await Bookmark.destroy({ where: { UserId, url } });
      res.status(200).json({ message: "Bookmark successfuly deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async showBookmark(req, res, next) {
    try {
      const UserId = +req.user.id;
      const bookmarks = await Bookmark.findAll({
        where: { UserId },
        order: [["id", "ASC"]],
      });
      res.status(200).json(bookmarks);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
