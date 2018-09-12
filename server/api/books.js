const router = require('express').Router()
const {Book, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    //const currentUser = await User.findById(req.user.id)
    //if (currentUser.isAdmin === true) {
    const newBook = await Book.create(req.body)
    res.status(201).json(newBook)
    //} else {
    //   throw new Error('only admins can add new books')
    // }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.id)
    if (currentUser.isAdmin === true) {
      const [rowsUpdate, [updatedBook]] = await Book.update(req.body, {
        returning: true,
        where: {name: req.body.name}
      })
      res.json(updatedBook)
    } else {
      throw new Error('only admins can edit books')
    }
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
