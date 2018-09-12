const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const Book = db.model('book')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/api/reviews/', () => {
    const reviewData1 = {
      title: 'I loved it',
      content:
        'A magical, life-chaning experience. This is maybe the best book ever written',
      stars: 5
    }
    const reviewData2 = {
      title: 'I liked it',
      content: 'It was pretty good, if not the greatest book ever written',
      stars: 4
    }
    // const reviewData3 = {
    //   title: 'I sort of liked it',
    //   content:
    //     'It was about average. I read it while waiting for another book in the mail.',
    //   stars: 3
    // }
    const bookData = {
      id: 1,
      name: 'Generic Book',
      author: 'Kevin Gislason',
      price: 100,
      description: 'A generic, uninteresting book for testing purposes'
    }

    // let review1, review2, book1, book2
    beforeEach(async () => {
      const review1 = await Review.create(reviewData1)
      const review2 = await Review.create(reviewData2)

      const book1 = await Book.create(bookData)
      review1.setBook(book1)
      review2.setBook(book1)
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
    it('GET /api/reviews/book/:bookId', async () => {
      const res = await request(app)
        .get('/api/reviews/book/1')
        .expect(200)
      console.log(res.body)
      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('I loved it')
      expect(res.body[0].bookId).to.be.equal(1)
      expect(res.body[1].title).to.be.equal('I liked it')
      expect(res.body[1].bookId).to.be.equal(1)
    })
  })
})
