const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/api/reviews/', () => {
    const reviewData = [
      {
        title: 'I loved it',
        content:
          'A magical, life-chaning experience. This is maybe the best book ever written',
        stars: 5,
        bookId: 1
      },
      {
        title: 'I liked it',
        content: 'It was pretty good, if not the greatest book ever written',
        stars: 4,
        bookId: 1
      },
      {
        title: 'I sort of liked it',
        content:
          'It was about average. I read it while waiting for another book in the mail.',
        stars: 3,
        bookId: 2
      }
    ]
    beforeEach(() => {
      return Review.bulkCreate(reviewData)
    })
    it('GET /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].content).to.be.equal(
        'A magical, life-chaning experience. This is maybe the best book ever written'
      )
      expect(res.body[1].content).to.be.equal(
        'It was pretty good, if not the greatest book ever written'
      )
    })
    // it('GET /api/reviews/book/:bookId', async () => {
    //   const res = await request(app)
    //     .get('api/reviews/book/2')
    //     .expect(200)
    //   expect(res.body).to.be.an('array')
    //   expect(res / body[0].content).to.be.equal()
    // })
  })
})
