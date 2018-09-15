import axios from 'axios'

/**
 * ACTION TYPES
 */

export const REQUEST_USERS_ORDERS = 'REQUEST_USERS_ORDERS'
export const GOT_USERS_ORDERS = 'GOT_USERS_ORDERS'
export const REQUEST_ONE_ORDER = 'REQUEST_ONE_ORDER'
export const GOT_ONE_ORDER = 'GOT_ONE_ORDER'

/**
 * ACTION CREATORS
 */

const sendUsersOrdersFromServer = list => {
  return {
    type: GOT_USERS_ORDERS,
    list
  }
}

const requestUsersOrdersFromServer = () => {
  return {
    type: REQUEST_USERS_ORDERS
  }
}

const sendOneOrderFromServer = order => {
  return {
    type: GOT_ONE_ORDER,
    order
  }
}

const requestOneOrderFromServer = () => {
  return {
    type: REQUEST_ONE_ORDER
  }
}
/**
 * THUNK CREATORS
 */

export const fetchUsersOrdersFromServer = id => {
  return async dispatch => {
    try {
      dispatch(requestUsersOrdersFromServer())
      const response = await axios.get(`/api/users/${id}/orders`)
      const usersOrders = response.data
      dispatch(sendUsersOrdersFromServer(usersOrders))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchOneUserOrderFromServer = (userId, orderId) => {
  return async dispatch => {
    try {
      dispatch(requestOneOrderFromServer())
      const response = await axios.get(`/api/users/${userId}/orders/${orderId}`)
      const oneOrder = response.data
      dispatch(sendOneOrderFromServer(oneOrder))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * INITIAL STATE
 */

const initialState = {
  usersOrders: [],
  oneOrder: [],
  allOrdersAreFetching: true,
  oneOrderIsFetching: true
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_ORDERS:
      return {
        ...state,
        usersOrders: action.list,
        allOrdersAreFetching: false
      }
    case REQUEST_USERS_ORDERS:
      return {
        ...state,
        allOrdersAreFetching: true
      }
    case GOT_ONE_ORDER:
      return {
        ...state,
        oneOrder: action.order,
        oneOrderIsFetching: false
      }
    case REQUEST_ONE_ORDER:
      return {
        ...state,
        oneOrderIsFetching: true
      }
    default:
      return state
  }
}

export default orderReducer
