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
    let books = await Book.findAll()
    // Sorting by author lastname, then book name, then hardcover before paperback;
    //It's sadly not possible to do this in the Sequelize querry itself //because author lastname isn't its own column
    books = books.sort((a, b) => {
      let lastNameA = a.author.split(' ').pop()
      let lastNameB = b.author.split(' ').pop()
      if (lastNameA < lastNameB) return -1
      else if (lastNameB < lastNameA) return 1
      else if (a.name < b.name) return -1
      else if (b.name < a.name) return 1
      else if (a.editionType === 'hardcover') return -1
      else if (b.editionType === 'hardcover') return 1
      return 0
    })

    res.status(200).json(books)
  } catch (err) {
    next(err)
  }
})
