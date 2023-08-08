'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CardInfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Card, {
                targetKey: 'card_id',
                foreignKey: 'card_id',
            });
        }
    }
    CardInfo.init(
        {
            card_info_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            card_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            position: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            color: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            worker: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: '미지정',
            },
            deadline: {
                allowNull: false,
                type: DataTypes.DATE,
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
            modelName: 'CardInfo',
        }
    );
    return CardInfo;
};
