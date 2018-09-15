import axios from 'axios'

//Action Types
const ADD_BOOK = 'ADD_BOOK'
const UPDATE_BOOK = 'UPDATE_BOOK'
export const REQUEST_ALL_BOOKS = 'REQUEST_ALL_BOOKS'
export const GOT_ALL_BOOKS = 'GOT_ALL_BOOKS'
export const GOT_ALL_GENRES = 'GOT_ALL_GENRES'

const sendGenreListFromServer = list => {
  return {
    type: GOT_ALL_GENRES,
    list
  }
}

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
      book.genres = book.genres.split(',')
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
    const bookGenres = []
    response.data.forEach(book =>
      book.genres.forEach(genre => {
        if (bookGenres.indexOf(genre) === -1) {
          bookGenres.push(genre)
        }
      })
    )
    dispatch(gotAllBooksFromServer(response.data))
    dispatch(sendGenreListFromServer(bookGenres))
  }
}

//Reducer
const initialState = {
  list: [],
  genres: [],
  isFetching: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK: {
      return {...state, list: [...state.list, action.book]}
    }
    case UPDATE_BOOK: {
      const newBookArray = state.list.slice().map(book => {
        if (book.id === action.book.id) {
          return action.book
        } else {
          return book
        }
      })
      return {...state, list: newBookArray}
    }
    case GOT_ALL_GENRES:
      return {
        ...state,
        genres: action.list
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
