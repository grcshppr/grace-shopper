import axios from 'axios'

export const REQUEST_ALL_BOOKS = 'REQUEST_ALL_BOOKS'
export const GOT_ALL_BOOKS = 'GOT_ALL_BOOKS'
export const GOT_ALL_GENRES = 'GOT_ALL_GENRES'

const sendGenreListFromServer = list => {
  return {
    type: GOT_ALL_GENRES,
    list
  }
}

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
const initialState = {
  list: [],
  genres: [],
  isFetching: false
}

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state
  }
}

export default booksReducer
