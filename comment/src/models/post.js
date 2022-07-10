"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.hasMany(models.Comment, {
        foreignKey:"post_id",
        as:"comments"
      })
    }
  }
  Post.init(
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
      media: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );
  return Post;
};
