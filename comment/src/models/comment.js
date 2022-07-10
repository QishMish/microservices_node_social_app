"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {}
  }
  Comment.init(
    {
      uuid: {
        type: DataTypes.UUID,
      },
      body: {
        type: DataTypes.TEXT,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      post_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
    }
  );
  return Comment;
};
