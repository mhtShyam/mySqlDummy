'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('users',{
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING(25),
        allowNull:false,
        unique:true
    },
    passwd:{
        type:Sequelize.STRING(11),
        allowNull:false
    },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
