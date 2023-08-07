'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
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
            this.belongsTo(models.User, {
                targetKey: 'user_id',
                foreignKey: 'user_id',
            });
        }
    }
    Comment.init(
        {
            comment_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            card_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            content: {
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
            modelName: 'Comment',
        }
    );
    return Comment;
};
