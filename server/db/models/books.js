const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  editionType: {
    type: Sequelize.ENUM,
    values: ['hardcover', 'paperback', 'ebook']
  },
  publisher: {
    type: Sequelize.STRING
  },
  imgUrl: {
    //add default value
    type: Sequelize.STRING,
    defaultValue: 'img..'
  },
  ISBN: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  availability: {
    type: Sequelize.BOOLEAN,
  }
})

Book.hook('afterSave', (book, options) => {
  if(book.quantity === 0){
    book.availability = false
  }
})

module.exports = Book
