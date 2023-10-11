var DataTypes = require("sequelize").DataTypes;
var _api_key = require("./api_key");
var _api_logs = require("./api_logs");
var _banners = require("./banners");
var _carts = require("./carts");
var _category = require("./category");
var _contact_us = require("./contact_us");
var _master_orders = require("./master_orders");
var _order_status = require("./order_status");
var _orders = require("./orders");
var _orders_details = require("./orders_details");
var _product_images = require("./product_images");
var _products = require("./products");
var _review_images = require("./review_images");
var _reviews = require("./reviews");
var _transaction = require("./transaction");
var _user_address = require("./user_address");
var _users = require("./users");
var _vendor_images = require("./vendor_images");
var _vendor_store = require("./vendor_store");

function initModels(sequelize) {
  var api_key = _api_key(sequelize, DataTypes);
  var api_logs = _api_logs(sequelize, DataTypes);
  var banners = _banners(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var contact_us = _contact_us(sequelize, DataTypes);
  var master_orders = _master_orders(sequelize, DataTypes);
  var order_status = _order_status(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var orders_details = _orders_details(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var review_images = _review_images(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);
  var user_address = _user_address(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vendor_images = _vendor_images(sequelize, DataTypes);
  var vendor_store = _vendor_store(sequelize, DataTypes);


  return {
    api_key,
    api_logs,
    banners,
    carts,
    category,
    contact_us,
    master_orders,
    order_status,
    orders,
    orders_details,
    product_images,
    products,
    review_images,
    reviews,
    transaction,
    user_address,
    users,
    vendor_images,
    vendor_store,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
