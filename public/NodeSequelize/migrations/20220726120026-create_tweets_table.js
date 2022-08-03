'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('tweets',{
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userId:Sequelize.INTEGER(11),
    content:Sequelize.STRING(300),
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('tweets');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
