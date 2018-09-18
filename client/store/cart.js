import axios from 'axios'

//Action types
export const GOT_CART = 'GET_CART'
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
export const DECREASE_CART_QUANTITY = 'DECREASE_CART_QUANTITY'
export const INCREASE_CART_QUANTITY = 'INCREASE_CART_QUANTITY'
export const CLEAR_CART_AFTER_PURCHASE = 'CLEAR_CART_AFTER_PURCHASE'

//Action creators
export const gotCartItems = books => ({
  type: GOT_CART,
  books
})

export const addItemToCart = book => ({
  type: ADD_ITEM_TO_CART,
  book
})

export const removeItemFromCart = bookId => ({
  type: REMOVE_ITEM_FROM_CART,
  bookId
})

export const decreaseCartQuantity = bookId => ({
  type: DECREASE_CART_QUANTITY,
  bookId
})

export const increaseCartQuantity = bookId => ({
  type: INCREASE_CART_QUANTITY,
  bookId
})

export const clearCart = cart => {
  return {
    type: CLEAR_CART_AFTER_PURCHASE,
    cart
  }
}

//Thunk Creators

export const fetchCartItems = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart`)
      const bookList = data.map(item => {
        return {...item.book, cartQuantity: item.cartQuantity}
      })
      dispatch(gotCartItems(bookList))
    } catch (err) {
      console.error(err)
    }
  }
}

export const createNewCartItem = book => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/cart`, book)
      dispatch(addItemToCart(data.book))
    } catch (err) {
      console.error(err)
    }
  }
}

export const destroyItemFromCart = book => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${book}`)
      dispatch(removeItemFromCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const decreaseCartQuantityServer = bookId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/decrease/${bookId}`)
      dispatch(decreaseCartQuantity(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const increaseCartQuantityServer = bookId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/increase/${bookId}`)
      dispatch(increaseCartQuantity(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//cart editor thanks Kevin
const cartReduce = (alreadyAccumulated, currentBook) => {
  let matchingBook = alreadyAccumulated.find(
    elem => elem.name === currentBook.name
  )
  if (matchingBook) {
    matchingBook.cartQuantity++
    return alreadyAccumulated
  } else {
    return [...alreadyAccumulated, {...currentBook, cartQuantity: 1}]
  }
}

//Reducer

export default function(cart = [], action) {
  switch (action.type) {
    case GOT_CART:
      if (action.books.length) {
        return action.books
      } else {
        return cart.reduce(cartReduce, [])
      }
    case ADD_ITEM_TO_CART: {
      const newCart = [...cart, action.book]
      return newCart.reduce(cartReduce, [])
    }
    case DECREASE_CART_QUANTITY: {
      const newCart = cart.map(book => {
        if (book.id == action.bookId) {
          return {...book, cartQuantity: book.cartQuantity - 1}
        } else {
          return book
        }
      })
      return newCart
    }
    case INCREASE_CART_QUANTITY: {
      const newCart = cart.map(book => {
        if (book.id == action.bookId) {
          return {...book, cartQuantity: book.cartQuantity + 1}
        } else {
          return book
        }
      })
      return newCart
    }
    case REMOVE_ITEM_FROM_CART: {
      const newCartArray = cart.filter(book => book.id != action.bookId)
      return newCartArray
    }
    case CLEAR_CART_AFTER_PURCHASE: {
      return {
        cart: action.cart
      }
    }
    default:
      return cart
  }
}
