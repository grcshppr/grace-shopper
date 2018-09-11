/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {DetailedBook} from './detailed-book.js'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('DetailedBook', () => {
  let wrapper

  beforeEach(() => {
    const books = [
      {
        id: 1,
        name: "You Don't Know JS",
        author: 'Kyle Simpson',
        price: 20.0,
        imgUrl: '/img/book.jpg',
        availability: true,
        editionType: 'paperback',
        publisher: "O'Reilly Media"
      },
      {
        // Shouldn't render
        id: 2,
        name: 'Some Other Book',
        author: 'Kevin Gislason',
        price: 10.0,
        imgUrl: '/img/book.jpg',
        availability: true,
        editionType: 'hardcover',
        publisher: 'Random House'
      }
    ]
    wrapper = shallow(
      <DetailedBook
        books={books}
        match={{params: {id: 1}, isExact: true, path: '', url: ''}}
      />
    )
  })

  it('renders the book name in an h2', () => {
    expect(wrapper.find('h2').text()).to.be.equal("You Don't Know JS")
  })
  it('renders the author name in an h4', () => {
    expect(wrapper.find('h4').text()).to.be.equal('by Kyle Simpson')
  })
  it('renders an image', () => {
    expect(wrapper.find('img').prop('src')).to.be.equal('/img/book.jpg')
  })
  it('Renders Out of Stock when book is out of stock', () => {
    expect(
      wrapper
        .findWhere(
          node => node.type() === 'h5' && node.contains('Out of stock')
        )
        .text()
    ).to.equal('Out of stock')
  })
})
