const Sequelize = require('sequelize')
const db = require('../db')
const Cart = db.define('cart', {
  cartQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})
module.exports = Cart
