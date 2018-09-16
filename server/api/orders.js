const router = require('express').Router()
const {OrderBook, Book, Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      order: [['date', 'DESC']],
      include: [{model: User}]
    })
    res.status(200).json(allOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderContents = await OrderBook.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.status(200).json(orderContents)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const usersOrders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      order: [['date', 'DESC']],
      include: [{model: User}, {model: OrderBook, include: [Book]}]
    })
    res.status(200).json(usersOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId/orders/:userId', async (req, res, next) => {
  try {
    const userOrder = await Order.findById(req.params.orderId, {
      include: [{model: OrderBook, include: [Book]}]
    })
    res.status(200).json(userOrder)
  } catch (error) {
    next(error)
  }
})
