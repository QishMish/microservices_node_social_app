"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Comment, {
        foreignKey: "user_id",
        sourceKey: "uuid",
        as: "comments",
      });
      this.hasMany(models.Post, {
        foreignKey: "user_id",
        sourceKey: "uuid",
        as: "posts",
      });
      this.hasMany(models.PostLike, {
        foreignKey: "user_id",
        sourceKey: "uuid",
        as: "likes",
      });
    }
  }
  User.init(
    {
      uuid: DataTypes.UUID,
      username: DataTypes.STRING,
      profile_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
