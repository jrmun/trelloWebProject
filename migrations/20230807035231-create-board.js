'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Boards', {
            board_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'user_id',
                },
                onDelete: 'CASCADE',
            },
            board_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            bg_color: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Boards');
    },
};
