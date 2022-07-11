"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.Post, { foreignKey: "post_id",targetKey: "uuid", });
      this.belongsTo(models.User, { foreignKey: "user_id",targetKey: "uuid", });
    }
  }
  Comment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
        type: DataTypes.UUID,
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
