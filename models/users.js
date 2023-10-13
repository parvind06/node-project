const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const User= sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.ENUM('1','2','3'),
      allowNull: false,
      defaultValue: "1",
      comment: "1-user,2-vendor,3-superadmin"
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    otp: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      defaultValue: "0"
    },
    otp_verify: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0",
      comment: "1-verify,0-not verify"
    },
    profile_pic: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: ""
    },
    is_age: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "1-above 21,0-below 21"
    },
    status: {
      type: DataTypes.ENUM('0','1','2'),
      allowNull: false,
      defaultValue: "1",
      comment: "0-deactive,1-active,2-delete"
    },
    front_doc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    back_doc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dl_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remember_token: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    customer_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
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
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    delete values.otp;
    delete values.otp_verify
    delete values.customer_id
    return values;
  }
  return User;
};
