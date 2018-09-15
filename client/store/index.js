import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import books from './books'
import reviews from './reviews'
import order from './orders'
import {reducer as formReducer} from 'redux-form'

const reducer = combineReducers({user, books, form: formReducer, reviews, order})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './reviews'
