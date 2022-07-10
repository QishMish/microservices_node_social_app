"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_friends", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      friend_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_friends");
  },
};
