'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Columns', {
            column_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            board_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Boards',
                    key: 'board_id',
                },
                onDelete: 'CASCADE',
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
            column_name: {
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
        await queryInterface.dropTable('Columns');
    },
};
