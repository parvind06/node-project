const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('api_key', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    shop_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: ""
    },
    api_key: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: ""
    },
    min_build: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: ""
    },
    current_build: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: ""
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "1",
      comment: "0-inactive, 1-active"
    }
  }, {
    sequelize,
    tableName: 'api_key',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
