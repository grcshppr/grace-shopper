/* global describe beforeEach it */

/* import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Books} from './index'
import { equal } from 'assert';

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Books', () => {
  let books

  const booksArray = [
    {
      id: 6456,
      name: `Harry Potter and the Philosopher's Stone`,
      price: '14.99',
      imageUrl: 'https://media.bloomsbury.com/rep/bj/9780747532699.jpg'
    },
    {
      id: 5467,
      name: 'Harry Potter and the Chamber of Secrets',
      price: '16.99',
      imageUrl: 'https://hpmedia.bloomsbury.com/rep/s/9781408855904_309575.jpeg'
    },
    {
      id: 4445,
      name: 'Harry Potter and The Prisoner of Azkaban',
      price: '18.99',
      imageUrl: 'https://hpmedia.bloomsbury.com/rep/s/9781408855911_309576.jpeg'
    },
    {
      id: 5546,
      name: 'Harry Potter and The Goblet of Fire',
      price: '20.99',
      imageUrl:
        'https://hpmedia.bloomsbury.com/rep/s/978%201408855928_309033.jpeg'
    }
  ]

  beforeEach(() => {
    books = shallow(<Books list={booksArray} />)
  })

  it('renders array of book list', () => {
      expect(books.find('li').key()).to.be.equal(5543)
  })
})
 */
