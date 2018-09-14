import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_REVIEWS_FOR_BOOK = 'GOT_REVIEWS_FOR_BOOK'
const ADD_REVIEW = 'ADD_REVIEW'

/**
 * ACTION CREATORS
 */
export const gotReviewsForBook = reviews => ({
  type: GOT_REVIEWS_FOR_BOOK,
  reviews
})

export const addReview = review => ({type: ADD_REVIEW, review})

/**
 * THUNK CREATORS
 */
export const fetchReviewsForBook = bookId => {
  return async dispatch => {
    const response = await axios.get(`/api/reviews/book/${bookId}`)
    const reviews = response.data
    const action = gotReviewsForBook(reviews)
    dispatch(action)
  }
}

export const createReview = (bookId, review) => {
  return async dispatch => {
    review.bookId = bookId
    const {data} = await axios.post(`/api/reviews/book/${bookId}`, review)
    dispatch(addReview(data))
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GOT_REVIEWS_FOR_BOOK:
      return action.reviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
