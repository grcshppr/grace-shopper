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
    type: Sequelize.DECIMAL
  }
})

OrderBook.hook('afterCreate', async (orderBook, options) => {
  let bookId = orderBook.getDataValue('bookId')
  const {data} = await Book.findById(bookId)
  orderBook.setDataValue('price', data.price)
})

module.exports = OrderBook
