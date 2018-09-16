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

/*
Before individual item is added to OrderBook table Query Book table for price & set price to persist even when products price is changed in the future
*/

OrderBook.beforeCreate(async (orderBook, options) => {
  let bookId = orderBook.bookId
  const response = await Book.findById(bookId)
  const setPrice = response.dataValues.price
  orderBook.setDataValue('price', setPrice)
})



OrderBook.afterCreate(async (orderBook, options) => {
  let orderId = orderBook.orderId
  //After Individual Item is Added To Purchase, Find its Order Tuple/Instance
  const order = await Order.findById(orderId)
  //Find All Items in That Order
  const response = await OrderBook.findAll({
    where: {
      orderId: orderId
    }
  })
  //Reduce to find the total price of the order
  const total = response.reduce(
    (accumulator, book) => accumulator + book.price * book.quantity,
    0
  )
  //Use setter method defined in Order Model, on the order instance found above & save
  order.set('totalPrice', total)
  order.save()
})

module.exports = OrderBook
