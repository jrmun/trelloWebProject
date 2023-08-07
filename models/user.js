'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Board, {
                sourceKey: 'user_id',
                foreignKey: 'user_id',
            });
            this.hasMany(models.BoardUser, {
                sourceKey: 'user_id',
                foreignKey: 'user_id',
            });
            this.hasMany(models.Column, {
                sourceKey: 'user_id',
                foreignKey: 'user_id',
            });
            this.hasMany(models.Card, {
                sourceKey: 'user_id',
                foreignKey: 'user_id',
            });
            this.hasMany(models.Comment, {
                sourceKey: 'user_id',
                foreignKey: 'user_id',
            });
        }
    }
    User.init(
        {
            user_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING(20),
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING(10),
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING(20),
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
            modelName: 'User',
        }
    );
    return User;
};
