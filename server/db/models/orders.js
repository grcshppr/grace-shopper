const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  paidFor: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'canceled', 'completed']
  },
})

module.exports = Order
