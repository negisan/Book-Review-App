'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Book }) {
      // define association here
      this.hasMany(Book, {
        foreignKey: 'reviewerId',
      })
    }

    toJSON() {
      return {
        ...this.get(),
        // id: undefined,
      }
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'User',
      defaultScope: {
        attributes: { exclude: ['hash'] },
      },
      scopes: {
        withHash: { attributes: {} },
      },
    }
  )
  return User
}
