import axios from 'axios'
import history from '../history'

export const REQUEST_ALL_BOOKS = 'REQUEST_ALL_BOOKS'
export const GOT_ALL_BOOKS = 'GOT_ALL_BOOKS'

const gotAllBooksFromServer = list => {
  return {
    type: GOT_ALL_BOOKS,
    list
  }
}

const requestAllBooksFromServer = () => {
  return {
    type: REQUEST_ALL_BOOKS
  }
}

export const fetchAllBooksFromServer = () => {
  return async dispatch => {
    dispatch(requestAllBooksFromServer())
    const response = await axios.get('/api/books')
    dispatch(gotAllBooksFromServer(response.data))
  }
}
const initialState = {
  list: [],
  isFetching: false
}

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_BOOKS:
      return {
        ...state,
        list: action.list,
        isFetching: false
      }
    case REQUEST_ALL_BOOKS:
      return {
        ...state,
        isFetching: true
      }
    default:
      return state
  }
}

export default booksReducer
