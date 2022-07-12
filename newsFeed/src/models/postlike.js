"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: "post_id",
        targetKey:"uuid",
        as: "user",
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey:"uuid",
        as:"posts"
      });
    }
  }
  PostLike.init(
    {
      post_id: {
        type: DataTypes.UUID,
        primaryKey:true
      },
      user_id: {
        type: DataTypes.UUID,
        primaryKey:true
      },
    },
    {
      sequelize,
      modelName: "PostLike",
      tableName: "post_likes",
    }
  );
  return PostLike;
};
