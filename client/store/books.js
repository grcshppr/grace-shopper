import axios from 'axios'
import history from '../history'

//Action Types
const ADD_BOOK = 'ADD_BOOK'
const UPDATE_BOOK = 'UPDATE_BOOK'
export const REQUEST_ALL_BOOKS = 'REQUEST_ALL_BOOKS'
export const GOT_ALL_BOOKS = 'GOT_ALL_BOOKS'

//Action Creators
const addBook = book => ({type: ADD_BOOK, book})
const updateBook = book => ({type: UPDATE_BOOK, book})
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

//Thunk Creators
export const createBook = book => {
  return async dispatch => {
    try {
      book.genres = book.genres.split(' ')
      const {data} = await axios.post('/api/books', book)
      dispatch(addBook(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const editBook = book => {
  return async dispatch => {
    try {
      book.genres = book.genres.split(' ')
      const {data} = await axios.put('/api/books', book)
      dispatch(updateBook(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchAllBooksFromServer = () => {
  return async dispatch => {
    dispatch(requestAllBooksFromServer())
    const response = await axios.get('/api/books')
    dispatch(gotAllBooksFromServer(response.data))
  }
}

//Reducer
const initialState = {
  list: [],
  isFetching: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK: {
      return {...state, list: [...state.list, action.book]}
    }
    case UPDATE_BOOK: {
      const newBookArray = state.list.map(book => {
        if (book.id === action.book.id) {
          book = action.book
        }
      })
      return {...state, list: newBookArray}
    }
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
    default: {
      return state
    }
  }
}
