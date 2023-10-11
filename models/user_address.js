const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_address', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true,
      defaultValue: "1",
      comment: "0-work, 1-home"
    },
    address_1: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    address_2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "state == County"
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    landmark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    pincode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    country: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: ""
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    longitude: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    status: {
      type: DataTypes.ENUM('0','1','2'),
      allowNull: false,
      defaultValue: "1",
      comment: "0-deactive, 1-active, 2-deleted"
    }
  }, {
    sequelize,
    tableName: 'user_address',
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
