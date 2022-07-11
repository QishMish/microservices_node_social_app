"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userFriends extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "requester_id",
        as: "sender",
      });
      this.belongsTo(models.User, {
        foreignKey: "addressee_id",
        as: "receiver",
      });
    }
  }

  userFriends.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      friend_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "UserFriend",
      tableName: "user_friends",
    }
  );
  return userFriends;
};
