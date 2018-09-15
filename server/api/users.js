const router = require('express').Router()
const {User, Order, Book, OrderBook} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const usersOrders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: OrderBook, include: [Book]}]
    })
    res.status(200).json(usersOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    const userOrder = await Order.findById(req.params.orderId, {
      include: [{model: OrderBook, include: [Book]}]
    })
    res.status(200).json(userOrder)
  } catch (error) {
    next(error)
  }
})
