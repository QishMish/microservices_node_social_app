"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFollower extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "following_id",
        targetKey: "uuid",
        as: "Following",
      });
      this.belongsTo(models.User, {
        foreignKey: "follower_id",
        targetKey: "uuid",
        as: "Follower",
      });
    }
  }
  UserFollower.init(
    {
      follower_id: {
        type: DataTypes.UUID,
      },
      following_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "UserFollower",
      tableName: "user_followers",
    }
  );
  return UserFollower;
};
