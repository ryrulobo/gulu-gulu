"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Bookmark, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Username is required" },
          notEmpty: { msg: "Username is required" },
          len: {
            args: [5, 20],
            msg: "Minimum username is 5 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Email must be valid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
          len: {
            args: [5, 20],
            msg: "Minimum password is 5 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.addHook("beforeCreate", (user, options) => {
    user.password = hashPassword(user.password);
  });

  return User;
};
