const User = require('./user')
const Book = require('./books')
const Review = require('./reviews')
const Order = require('./orders')
const OrderBook = require('./orders_books')
const Cart = require('./cart.js')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

//User-Order
User.hasMany(Order)
Order.belongsTo(User)

//User-Review
User.hasMany(Review)
Review.belongsTo(User)

//Book-Review
Book.hasMany(Review)
Review.belongsTo(Book)

//Book-Order
Book.belongsToMany(Order, {through: OrderBook})
Order.belongsToMany(Book, {through: OrderBook})

//Eager Loading Join-Table Data Enabled
Order.hasMany(OrderBook)
OrderBook.belongsTo(Order)

//Eager Loading Join-Table Data Enabled
Book.hasMany(OrderBook)
OrderBook.belongsTo(Book)

//Cart-User
Cart.belongsTo(User)
User.hasOne(Cart)

//Book-Cart
Cart.belongsTo(Book)

//Session-Cart

module.exports = {
  User,
  Book,
  Review,
  Order,
  OrderBook,
  Cart
}
