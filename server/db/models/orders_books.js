const Sequelize = require('sequelize')
const db = require('../db')
const Book = require('./books')

const OrderBook = db.define('order_book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

OrderBook.beforeCreate(async (orderBook, options) => {
  let bookId = orderBook.bookId
  const response = await Book.findById(bookId)
  const setPrice = response.dataValues.price
  orderBook.price = setPrice
})

module.exports = OrderBook
