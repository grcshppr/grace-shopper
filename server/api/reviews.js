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

//write review
router.post('/book/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId
    const newReview = await Review.create(req.body, {where: bookId})
    res.status(201).json(newReview)
  } catch (err) {
    next(err)
  }
})
