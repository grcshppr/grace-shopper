/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchAllBooksFromServer, GOT_ALL_BOOKS, REQUEST_ALL_BOOKS, GOT_ALL_GENRES} from './books'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    list: [],
    isFetching: false
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllBooksFromServer', () => {
    it('dispatches REQUEST_ALL_BOOKS, GOT_ALL_BOOKS, GOT_ALL_GENRES', async () => {

      const fakeData = [
        {
          name: `Harry Potter and the Philosopher's Stone`,
          genres: ['Fantasy'],
          author: 'J.K. Rowling',
          price: 14.99,
          quantity: 15,
          editionType: 'hardcover',
          publisher: 'Bloomsbury',
          imgUrl: 'https://media.bloomsbury.com/rep/bj/9780747532699.jpg',
          description: `Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia and Uncle Vernon's house, which he thinks is normal for someone like him who's parents have been killed in a 'car crash'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher's Stone! All this and muggles too. Now, what are they?`,
          availability: true
        },
        {
          name: 'Harry Potter and the Chamber of Secrets',
          genres: ['Fantasy'],
          author: 'J.K. Rowling',
          price: 16.99,
          quantity: 30,
          editionType: 'paperback',
          publisher: 'Bloomsbury',
          imgUrl:
            'https://hpmedia.bloomsbury.com/rep/s/9781408855904_309575.jpeg',
          description: `Harry Potter’s summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors – and then the attacks start. Students are found as though turned to stone … Dobby’s sinister predictions seem to be coming true.`,
          availability: true
        }
      ]
      mockAxios.onGet('/api/books').replyOnce(200, fakeData)
      await store.dispatch(fetchAllBooksFromServer())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(REQUEST_ALL_BOOKS)
      expect(actions[1].type).to.be.equal(GOT_ALL_BOOKS)
      expect(actions[1].list).to.be.deep.equal(fakeData)
      expect(actions[2].type).to.be.equal(GOT_ALL_GENRES)
    })
  })
})
