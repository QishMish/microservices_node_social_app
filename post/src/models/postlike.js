"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    static associate(models) {
    }
  }
  PostLike.init(
    {
      post_id: {
        type: DataTypes.UUID,
      },
      user_id: {
        type: DataTypes.INTEGER,
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
