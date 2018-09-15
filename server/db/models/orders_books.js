const Sequelize = require('sequelize')
const db = require('../db')
const Book = require('./books')
const Order = require('./orders')

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
  orderBook.setDataValue('price', setPrice)
})

OrderBook.afterCreate(async (orderBook, options) => {
  let orderId = orderBook.orderId
  const order = await Order.findById(orderId)
  const response = await OrderBook.findAll({
    where: {
      orderId: orderId
    }
  })
  const total = response.reduce(
    (accumulator, book) => accumulator + book.price * book.quantity,
    0
  )
  order.set('totalPrice', total)
  order.save()
})

module.exports = OrderBook
