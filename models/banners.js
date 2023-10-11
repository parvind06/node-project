const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('banners', {
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
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "1",
      comment: "1-active , 0-deactive"
    }
  }, {
    sequelize,
    tableName: 'banners',
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
