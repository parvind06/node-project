const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    payment_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    total_product: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'master_orders',
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
