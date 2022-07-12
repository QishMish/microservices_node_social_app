"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.hasMany(models.Comment, {
        foreignKey: "post_id",
        sourceKey: "uuid",
        as: "comments",
      });
      this.hasMany(models.PostLike, {
        foreignKey: "post_id",
        sourceKey: "uuid",
        as: "likes",
      });
      this.belongsTo(models.User, { foreignKey: "user_id", targetKey: "uuid" });
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
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      media: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.UUID,
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
