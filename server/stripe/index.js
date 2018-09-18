const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post('/', async (req, res) => {
  try {
    console.log('I got here', req.body)
    let {status} = await stripe.charges.create({
      amount: 10000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.token
    })
    console.log(`Here the status m8`, status)
    res.json({status})
  } catch (error) {
    res.status(500).end()
  }
})

module.exports = router
