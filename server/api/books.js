const router = require('express').Router()
const {Book} = require('../db/models')
const AdminMW = require('./middleware')
module.exports = router

router.post('/', AdminMW, async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body)
    res.status(201).json(newBook)
  } catch (err) {
    next(err)
  }
})

router.put('/', AdminMW, async (req, res, next) => {
  try {
    const [rowsUpdate, [updatedBook]] = await Book.update(req.body, {
      returning: true,
      where: {name: req.body.name}
    })
    res.status(200).json(updatedBook)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll()
    res.status(200).json(books)
  } catch (err) {
    next(err)
  }
})
