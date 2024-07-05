'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('properties', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      hostId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hostSince: {
        type: Sequelize.DATE,
        allowNull: true
      },
      hostName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hostLocation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      neighburhood: {
        type: Sequelize.STRING,
        allowNull: true
      },
      roomType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      beds: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      numberOfReviews: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      availability30: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      availability60: {
        type: Sequelize.STRING,
        allowNull: true
      },
      availability90: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      availability365: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deletedAt: {
        type: Sequelize.DATE
      }
      
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('properties')
  }
}