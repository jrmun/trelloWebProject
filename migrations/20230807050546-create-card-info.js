'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CardInfos', {
            card_info_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            card_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cards',
                    key: 'card_id',
                },
                onDelete: 'CASCADE',
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            content: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            position: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            color: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            worker: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            deadline: {
                allowNull: false,
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('CardInfos');
    },
};
