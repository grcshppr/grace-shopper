const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Book = db.model('book')

describe('Book routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/books/', () => {
    let HPdescription =
      'Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.'
    beforeEach(() => {
      return Book.create({
        name: 'Harry Potter',
        genre: ['young adult', 'fiction'],
        author: 'J.K. Rowling',
        price: 12.12,
        quantity: 100,
        editionType: 'paperback',
        description: HPdescription,
        availability: true
      })
    })

    it('POST /api/books', async () => {
      const res = await request(app)
        .post('/api/books')
        .send({
          name: 'Harry Potter',
          genre: ['young adult', 'fiction'],
          author: 'J.K. Rowling',
          price: 12.12,
          quantity: 100,
          editionType: 'paperback',
          description: HPdescription,
          availability: true
        })
        .expect(201)
      const createdBook = await Book.findById(res.body.id)
      expect(createdBook.name).to.equal('Harry Potter')
      expect(createdBook.description).to.be.equal(HPdescription)
    })
  }) // end describe('/api/books')
  describe('PUT /api/books/:bookId', () => {})
}) // end describe('Book routes')
