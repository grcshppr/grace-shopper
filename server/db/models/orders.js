const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  paidFor: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'canceled', 'completed']
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  stripeToken: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  setterMethods:{
    totalPrice: function(value) {
      this.setDataValue('totalPrice', value)
    },
    status: function(value) {
      this.setDataValue('status', value)
    },
    paidFor: function(value) {
      this.setDataValue('paidFor', value)
    }
  }
})

module.exports = Order
