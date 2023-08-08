'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BoardUser extends Model {
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
            this.belongsTo(models.Board, {
                targetKey: 'board_id',
                foreignKey: 'board_id',
            });
        }
    }
    BoardUser.init(
        {
            boarduser_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            board_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
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
            modelName: 'BoardUser',
        }
    );
    return BoardUser;
};
