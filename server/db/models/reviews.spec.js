const {expect} = require('chai')
const db = require('..')
const Review = db.model('review')

const app = require('../index.js')
const agent = require('supertest')(app)

describe('Review model', () => {
  // beforeEach(() => {
  //   return db.sync({force: true})
  // })

  describe('attributes definition', () => {
    let harryPotterReview
    let HPdescription =
      'My original review was a comparison of sorts between Harry Potter and Twilight. However, this is stupid as the two are incomparable. Honestly, its not even worth discussing. Its not just that Twilight doesnt come close, it is the fact that Harry Potter transcends other similar works. Its peerless.'
    it('can handle long content', async () => {
      harryPotterReview = await Review.create({
        title: 'Harry Potter rocks',
        content: HPdescription,
        stars: 5
      })
      expect(harryPotterReview).to.be.an('object')
      expect(harryPotterReview.content).to.equal(HPdescription)
    })
  })
  describe('POST `/api/reviews/book/:bookId', () => {
    it('should create a review', async () => {
      const response = await agent
        .post('/reviews/book/5')
        .send({
          title: 'Awesome POST-Created Article',
          stars: 5,
          content: 'Can you believe I did this in a test?'
        })
        .expect(201)
    })
  })
})
