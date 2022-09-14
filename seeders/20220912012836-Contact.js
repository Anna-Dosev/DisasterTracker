'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Contacts', [
      {
        fullName: 'Alexandra Ernest',
        email: 'alex@someemail.com',
        zipCode: '32503',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contacts', null, {});
  }
};
