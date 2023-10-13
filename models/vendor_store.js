const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vendor_store', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shop_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: ""
    },
    shop_no: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    shop_address_1: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: ""
    },
    shop_address_2: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    shop_state: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: ""
    },
    shop_city: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: ""
    },
    shop_pincode: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      defaultValue: ""
    },
    landmark: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    shop_country: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    shop_latitude: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: ""
    },
    shop_longitude: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: ""
    },
    shop_doc_number: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: ""
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "1",
      comment: "0-deactive , 1-active"
    }
  }, {
    sequelize,
    tableName: 'vendor_store',
    timestamps: false,
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
