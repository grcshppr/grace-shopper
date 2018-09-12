const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    reviews ? res.status(200).json(reviews) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const reviewId = req.params.id
    const review = await Review.findById(reviewId)
    review ? res.status(200).json(review) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

//Gets all reviews for a specific book
router.get('/book/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId
    const reviewsforBook = await Review.findAll({where: {bookId: bookId}})
    reviewsforBook ? res.status(200).send(reviewsforBook) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})
