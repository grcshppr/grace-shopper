const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {Order, OrderBook, Cart} = require('../db/models')

router.post('/', async (req, res) => {
  try {
    let userId
    if (req.body.userId) {
      userId = req.body.userId
    } else {
      userId = null
    }
    const newOrder = await Order.create({
      stripeToken: req.body.token,
      userId: userId,
      status: 'created'
    })
    const cleanCartArray = req.body.cart.map(cartItem => {
      return {
        bookId: cartItem.id,
        orderId: newOrder.id,
        quantity: cartItem.cartQuantity
      }
    })
    await OrderBook.bulkCreate(cleanCartArray, {individualHooks: true})
    const {totalPrice} = await Order.findById(newOrder.id)
    let {status} = await stripe.charges.create({
      amount: totalPrice,
      currency: 'usd',
      description: `Order Number ${newOrder.id}`,
      source: req.body.token
    })
    if (status === 'succeeded') {
      newOrder.set('status', 'processing')
      newOrder.set('paidFor', true)
      await newOrder.save()
      if (userId) {
        await Cart.destroy({
          where: {
            userId: userId
          }
        })
      }
    }
    const email = req.body.email
    const newOrderId = newOrder.id
    res.json({status, newOrderId, email})
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

module.exports = router
