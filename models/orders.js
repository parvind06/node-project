const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    master_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.00
    },
    shipping_amount: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.00
    },
    packaging_amount: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.00
    },
    discount_amount: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.00
    },
    tax_amount: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.00
    },
    grand_total: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.00
    },
    tax_percentage: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    discount_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    payment_type: {
      type: DataTypes.ENUM('1','2','3'),
      allowNull: false,
      defaultValue: "1",
      comment: "1-Other, 2-Stripe, 3-Apple Pay"
    },
    payment_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    transaction_id: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    instruction: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: ""
    },
    shipping_address: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'orders',
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
