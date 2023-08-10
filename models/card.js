'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Card extends Model {
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
            this.belongsTo(models.Column, {
                targetKey: 'column_id',
                foreignKey: 'column_id',
            });
            this.hasOne(models.CardInfo, {
                sourceKey: 'card_id',
                foreignKey: 'card_id',
            });
            this.hasMany(models.Comment, {
                sourceKey: 'card_id',
                foreignKey: 'card_id',
            });
        }
    }
    Card.init(
        {
            card_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            column_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            user_id: {
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
            modelName: 'Card',
        }
    );
    return Card;
};
