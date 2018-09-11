const {expect} = require('chai')
const db = require('../index')
const Book = db.model('book')

describe('Book model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('attributes definition', () => {
    let harryPotter
    let HPdescription =
      'Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.'
    it('includes `name`, `author`,`price`, `quantity`, and `description`', async () => {
      harryPotter = await Book.create({
        name: 'Harry Potter',
        genre: ['young adult', 'fiction'],
        author: 'J.K. Rowling',
        price: 12.12,
        quantity: 100,
        editionType: 'paperback',
        description: HPdescription,
        availability: true
      })
      expect(harryPotter).to.be.an('object')
      expect(harryPotter.name).to.equal('Harry Potter')
      expect(harryPotter.author).to.equal('J.K. Rowling')
      expect(harryPotter.quantity).to.equal(100)
      expect(harryPotter.description).to.equal(HPdescription)
    })
  })
})
