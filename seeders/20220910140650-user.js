'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Alexandra',
        lastName: 'Ernest',
        email: 'alex@someemail.com',
        password: 'somePlainTextPasswordForNow',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Gabby',
        lastName: 'Dosev',
        email: 'gabby@someemail.com',
        password: 'somePlainTextPasswordForNow',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Molly',
        lastName: 'Sanders',
        email: 'molly@someemail.com',
        password: 'somePlainTextPasswordForNow',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
