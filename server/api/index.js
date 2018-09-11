const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
<<<<<<< HEAD
router.use('/reviews', require('./reviews'))
=======
router.use('/books', require('./books'))
>>>>>>> master

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
