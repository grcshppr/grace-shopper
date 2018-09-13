const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Book = db.model('book')
const User = db.model('user')

describe('Book routes', () => {
  const testGenres = ['Fantasy']
  // let authenticatedUser
  // let normalUser
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/api/books/', () => {
    const bookData = [
      {
        name: `Harry Potter and the Philosopher's Stone`,
        genres: testGenres,
        author: 'J.K. Rowling',
        price: 1499,
        quantity: 15,
        editionType: 'hardcover',
        publisher: 'Bloomsbury',
        imgUrl: 'https://media.bloomsbury.com/rep/bj/9780747532699.jpg',
        description: `Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia and Uncle Vernon's house, which he thinks is normal for someone like him who's parents have been killed in a 'car crash'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher's Stone! All this and muggles too. Now, what are they?`,
        availability: true
      },
      {
        name: 'Harry Potter and the Chamber of Secrets',
        genres: testGenres,
        author: 'J.K. Rowling',
        price: 1699,
        quantity: 30,
        editionType: 'paperback',
        publisher: 'Bloomsbury',
        imgUrl:
          'https://hpmedia.bloomsbury.com/rep/s/9781408855904_309575.jpeg',
        description: `Harry Potter’s summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors – and then the attacks start. Students are found as though turned to stone … Dobby’s sinister predictions seem to be coming true.`,
        availability: true
      }
    ]
    beforeEach(() => {
      return Book.bulkCreate(bookData)
    })
    it('GET /api/books', async () => {
      const res = await request(app)
        .get('/api/books')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(
        `Harry Potter and the Philosopher's Stone`
      )
      expect(res.body[0].genres).to.deep.equal(testGenres)
      expect(res.body[0].author).to.be.equal('J.K. Rowling')
      expect(res.body[0].price).to.be.equal(1499)
      expect(res.body[0].quantity).to.be.equal(15)
      expect(res.body[0].editionType).to.be.equal('hardcover')
      expect(res.body[0].publisher).to.be.equal('Bloomsbury')
      expect(res.body[0].imgUrl).to.be.equal(
        'https://media.bloomsbury.com/rep/bj/9780747532699.jpg'
      )
      expect(res.body[0].description).to.be.equal(
        `Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia and Uncle Vernon's house, which he thinks is normal for someone like him who's parents have been killed in a 'car crash'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher's Stone! All this and muggles too. Now, what are they?`
      )
      expect(res.body[1].name).to.be.equal(
        'Harry Potter and the Chamber of Secrets'
      )
      expect(res.body[1].genres).to.deep.equal(testGenres)
      expect(res.body[1].author).to.be.equal('J.K. Rowling')
      expect(res.body[1].price).to.be.equal(1699)
      expect(res.body[1].quantity).to.be.equal(30)
      expect(res.body[1].editionType).to.be.equal('paperback')
      expect(res.body[1].publisher).to.be.equal('Bloomsbury')
      expect(res.body[1].imgUrl).to.be.equal(
        'https://hpmedia.bloomsbury.com/rep/s/9781408855904_309575.jpeg'
      )
      expect(res.body[1].description).to.be.equal(
        `Harry Potter’s summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors – and then the attacks start. Students are found as though turned to stone … Dobby’s sinister predictions seem to be coming true.`
      )
    })
    // beforeEach(async () => {
    //   authenticatedUser = await User.create({
    //     email: 'abby@abby.com',
    //     password: 'password',
    //     firstName: 'Abby',
    //     lastName: 'Wiggy',
    //     isAdmin: true
    //   })
    //   normalUser = await User.create({
    //     email: 'abby@abby.com',
    //     password: 'password',
    //     firstName: 'Abby',
    //     lastName: 'Wiggy',
    //     isAdmin: false
    //   })
    // })
    describe('AUTHENTICATION /api/books', () => {
      const authenticatedUser = {
        email: 'abby.wigdale@gmail.com',
        password: 'password',
        firstName: 'abby',
        lastName: 'Wiggy',
        isAdmin: true
      }
      // const normalUser = {
      //   email: 'abby@abby.com',
      //   password: 'password',
      //   firstName: 'Abby',
      //   lastName: 'Wiggy',
      //   isAdmin: false
      // }
      const agent = request(app)
      before(() => {
        agent
          .post('/login')
          .send(authenticatedUser)
          .end()
      })
      it('should create a new book if user is admin', () => {
        agent.post('/api/books').expect(201)
      })
      // it('should not allow non-admin users to create book', () => {
      //   normalUser.post('/api/books').expect(401)
      // })
      it('should update a new book if user is admin', () => {
        agent.post('/api/books').expect(201)
      })
      // it('should not allow non-admin users to update book', () => {
      //   normalUser.post('/api/books').expect(401)
      // })
    })
  }) // end describe('/api/books')
}) // end describe('User routes')
