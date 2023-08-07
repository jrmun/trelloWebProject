'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Board extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                targetKey: 'user_id',
                foreignKey: 'user_id',
            });
            this.hasMany(models.BoardUser, {
                sourceKey: 'board_id',
                foreignKey: 'board_id',
            });
            this.hasMany(models.Column, {
                sourceKey: 'board_id',
                foreignKey: 'board_id',
            });
        }
    }
    Board.init(
        {
            board_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            board_name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            bg_color: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            description: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Board',
        }
    );
    return Board;
};
