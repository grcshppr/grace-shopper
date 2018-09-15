import {expect} from 'chai'
import {fetchReviewsForBook} from './reviews'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getReviewsForBook', () => {
    it('eventually dispatches the GOT_REVIEWS_FOR_BOOK action', async () => {
      const fakeReviews = [
        {
          bookId: 1,
          stars: 3,
          title: 'This book was okay',
          content: 'Nothing much else to say, neither good or bad'
        },
        {
          bookId: 1,
          stars: 1,
          title: 'This book was very bad',
          content:
            'I can\t believe I wasted my hard-earned money on this dreck!'
        }
      ]
      mockAxios.onGet('api/reviews/book/1').replyOnce(200, fakeReviews)
      await store.dispatch(fetchReviewsForBook(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_REVIEWS_FOR_BOOK')
      expect(actions[0].reviews).to.be.deep.equal(fakeReviews)
    })
  })
})
