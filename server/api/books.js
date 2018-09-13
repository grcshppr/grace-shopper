const router = require('express').Router()
const {Book} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('hi')
    let books = await Book.findAll()
    // Sorting by author lastname; it's sadly not possible to do this in the Sequelize querry itself since author lastname isn't its own column
    books = books.sort((a, b) => {
      let lastNameA = a.author.split(' ').pop()
      console.log(lastNameA)
      let lastNameB = b.author.split(' ').pop()
      if (lastNameA < lastNameB) return -1
      else if (lastNameB < lastNameA) return 1
      else if (a.editionType === 'hardcover') return -1
      else if (b.editionType === 'hardcover') return 1
      return 0
    })

    res.status(200).json(books)
  } catch (err) {
    next(err)
  }
})
