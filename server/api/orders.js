const router = require('express').Router()
const {OrderBook} = require('../db/models')
module.exports = router

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
