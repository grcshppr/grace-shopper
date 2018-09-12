const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const reviewId = req.params.id
    const review = await Review.findById(reviewId)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

//Gets all reviews for a specific book
router.get('/book/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId
    const reviewsforBook = await Review.findAll({where: {bookId}})
    res.json(reviewsforBook)
  } catch (err) {
    next(err)
  }
})
