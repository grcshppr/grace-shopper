const router = require('express').Router()
const {Cart, Book} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//we are getting all the objects and sending back all the cart items associated with the user
router.get('/', async (req, res, next) => {
  try {
    const user = req.user.id
    const cart = await Cart.findAll({
      where: {userId: user},
      include: [{model: Book}]
    })
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = req.user.id
    let newCartItem
    const [{dataValues}, value] = await Cart.findOrCreate({
      where: {
        userId: user,
        bookId: req.body.id
      }
    })
    //If it exists we enter this and update the cartQuantity, send back the updated cart object including the book
    if (!value) {
      const updatedQuantity = dataValues.cartQuantity + 1
      await Cart.update(
        {cartQuantity: updatedQuantity},
        {
          where: {
            id: dataValues.id
          }
        }
      )
      newCartItem = await Cart.findById(dataValues.id, {
        include: [{model: Book}]
      })
      //If it doesn't already exist, we create it and send back the updated cart object including the book details
    } else {
      newCartItem = await Cart.findById(dataValues.id, {
        include: [{model: Book}]
      })
    }
    res.status(201).json(newCartItem)
  } catch (err) {
    next(err)
  }
})

//PUT route to decrease the cart quantity
router.put('/decrease/:bookId', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(200).json(req.params.bookId)
    } else {
      const [{dataValues}, value] = await Cart.findAll({
        where: {userId: req.user.id, bookId: req.params.bookId}
      })
      const newCartQuantity = dataValues.cartQuantity - 1
      await Cart.update(
        {cartQuantity: newCartQuantity},
        {where: {id: dataValues.id}}
      )
      res.status(200).json(req.params.bookId)
    }
  } catch (err) {
    next(err)
  }
})

//PUT route to increase the cart quantity
router.put('/increase/:bookId', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(200).json(req.params.bookId)
    } else {
      const [{dataValues}, value] = await Cart.findAll({
        where: {userId: req.user.id, bookId: req.params.bookId}
      })
      const newCartQuantity = dataValues.cartQuantity + 1
      await Cart.update(
        {cartQuantity: newCartQuantity},
        {where: {id: dataValues.id}}
      )
      res.status(200).json(req.params.bookId)
    }
  } catch (err) {
    next(err)
  }
})

//We delete the entire cart instance --checking first to see if the user exists
router.delete('/:bookId', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(200).json(req.params.bookId)
    } else {
      const user = req.user.id
      await Cart.destroy({where: {userId: user, bookId: req.params.bookId}})
      res.status(200).json(req.params.bookId)
    }
  } catch (err) {
    next(err)
  }
})
