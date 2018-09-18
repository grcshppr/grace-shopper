const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {Order, OrderBook, Cart} = require('../db/models')
const nodemailer = require('nodemailer')

//SMTP
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'graceshopperbookstack@gmail.com',
    pass: process.env.SMTP_PASSWORD
  }
})

router.post('/', async (req, res) => {
  const email = req.body.email

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

    const newOrderId = newOrder.id

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

      const mailOptions = {
        from: 'graceshopperbookstack@gmail.com',
        to: email,
        subject: 'Thank you for your purchase!',
        html: `<h2>Thank you for shopping with us!</h2>
               <h3>Order # ${newOrderId}</h3>
               <p>We would like to inform you that your payment has been received and Order # ${newOrderId} is being processed. Once the items have been packed, they will be shipped to you immediatly.</p>
               <p>If you have any questions on your payment, plees feel free to contact us</p>
               <p>Hope you enjoyed shopping weith us!</p>`
      }

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err)
        else console.log(info)
      })
    }

    res.json({status, newOrderId, email})
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

module.exports = router
