"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.UserFriend, {
        foreignKey: "user_id",
        as: "sender",
      });
      this.hasMany(models.UserFriend, {
        foreignKey: "friend_id",
        as: "receiver",
      });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
      },
      email: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      verified: {
        type: DataTypes.BOOLEAN,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "BLOCKED", "DISABLE"),
      },
      profilePhotoURL: {
        type: DataTypes.STRING,
      },
      coverPhotoURL: {
        type: DataTypes.STRING,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      location: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
