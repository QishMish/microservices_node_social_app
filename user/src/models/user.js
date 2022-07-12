"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.User, {
        through: models.UserFollower,
        as: "Followers",
        sourceKey: "uuid",
        foreignKey: "follower_id",
      });
      User.belongsToMany(models.User, {
        through: models.UserFollower,
        as: "Following",
        sourceKey: "uuid",
        foreignKey: "following_id",
      });
      // this.hasMany(models.UserFriend, {
      //   foreignKey: "user_id",
      //   as: "sender",
      // });
      // this.hasMany(models.UserFriend, {
      //   foreignKey: "friend_id",
      //   as: "receiver",
      // });
      // this.belongsToMany(models.User, {
      //   through: "user_friends",
      //   as: "friends",
      //   foreignKey: "user_id",
      // });
      // this.belongsToMany(models.User, {
      //   through: "user_friends",
      //   as: "userFriend",
      //   foreignKey: "friend_id",
      // });
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
