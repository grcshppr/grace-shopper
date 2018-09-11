import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_REVIEWS_FOR_BOOK = 'GOT_REVIEWS_FOR_BOOK'


/**
 * ACTION CREATORS
 */
export const gotReviewsForBook= reviews => ({
  type: GOT_REVIEWS_FOR_BOOK,
  reviews
})


/**
 * THUNK CREATORS
 */
export const fetchReviewsForBook = (bookId) => {
  return async dispatch => {
    const response = await axios.get(`/api/reviews/book/${bookId}`)
    const reviews = response.data;
    const action = gotReviewsForBook(reviews);
    dispatch(action);
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch(action.type) {
    case GOT_REVIEWS_FOR_BOOK:
      return action.reviews
    default:
      return state
  }
}
