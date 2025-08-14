'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          body: 'To work in Freshcode',
          deadline: '2025-12-01',
          user_id: 1,
          createed_at: new Date(),
          updated_at: new Date(),
        },
            {
          body: 'To work in Freshcode',
          deadline: '2025-12-01',
          user_id: 2,
          createed_at: new Date(),
          updated_at: new Date(),
        },
            {
          body: 'To work in Freshcode',
          deadline: '2025-12-01',
          user_id: 3,
          createed_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
