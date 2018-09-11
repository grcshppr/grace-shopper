import axios from 'axios'
import history from '../history'

//Action Types
const ADD_BOOK = 'ADD_BOOK'
const UPDATE_BOOK = 'UPDATE_BOOK'

//Action Creators
const addBook = book => ({type: ADD_BOOK, book})
const updateBook = book => ({type: UPDATE_BOOK, book})

//Thunk Creators
export const createBook = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/books')
      console.log('this is our data', data)
      dispatch(addBook(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const editBook = () => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/books')
      dispatch(updateBook(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//Reducer

export default function(books = [], action) {
  switch (action.type) {
    case ADD_BOOK: {
      return [...books, action.book]
    }
    case UPDATE_BOOK: {
      const newBookArray = books.map(book => {
        if (book.id === action.book.id) {
          book = action.book
        }
      })
      return newBookArray
    }
    default: {
      return books
    }
  }
}
