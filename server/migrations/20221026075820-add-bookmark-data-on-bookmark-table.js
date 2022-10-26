"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn("Bookmarks", "datePublished", {
        type: Sequelize.DATE,
      }),
      await queryInterface.addColumn("Bookmarks", "provider", {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn("Bookmarks", "thumbnail", {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn("Bookmarks", "name", {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn("Bookmarks", "description", {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn("Bookmarks", "datePublished"),
      await queryInterface.removeColumn("Bookmarks", "provider"),
      await queryInterface.removeColumn("Bookmarks", "thumbnail"),
      await queryInterface.removeColumn("Bookmarks", "name"),
      await queryInterface.removeColumn("Bookmarks", "description"),
    ]);
  },
};
