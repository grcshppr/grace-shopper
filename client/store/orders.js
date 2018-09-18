import axios from 'axios'

/**
 * ACTION TYPES
 */

export const REQUEST_USERS_ORDERS = 'REQUEST_USERS_ORDERS'
export const GOT_USERS_ORDERS = 'GOT_USERS_ORDERS'
export const REQUEST_ONE_ORDER = 'REQUEST_ONE_ORDER'
export const GOT_ONE_ORDER = 'GOT_ONE_ORDER'
export const REQUEST_ALL_ORDERS = 'REQUEST_ALL_ORDERS'
export const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
export const UPDATED_ORDER = 'UPDATED_ORDER'
export const REQUEST_UPDATE_ORDER = 'REQUEST_UPDATE_ORDER'
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

const sendAllOrders = list => ({
  type: GOT_ALL_ORDERS,
  list
})

const requestAllOrders = () => ({
  type: REQUEST_ALL_ORDERS
})

const requestUpdateOrder = () => ({
  type: REQUEST_UPDATE_ORDER
})

const updatedOrder = order => ({
  type: UPDATED_ORDER,
  order
})
/**
 * THUNK CREATORS
 */

export const fetchUsersOrdersFromServer = userId => {
  return async dispatch => {
    try {
      dispatch(requestUsersOrdersFromServer())
      const response = await axios.get(`/api/orders/${userId}/orders`)
      const usersOrders = response.data
      dispatch(sendUsersOrdersFromServer(usersOrders))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchOneUserOrderFromServer = (orderId, userId) => {
  return async dispatch => {
    try {
      dispatch(requestOneOrderFromServer())
      const response = await axios.get(
        `/api/orders/${orderId}/orders/${userId}`
      )
      const oneOrder = response.data
      dispatch(sendOneOrderFromServer(oneOrder))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      dispatch(requestAllOrders())
      const {data} = await axios.get('/api/orders')
      dispatch(sendAllOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateOrder = (orderId, newOrderStatus) => {
  return async dispatch => {
    try {
      dispatch(requestUpdateOrder())
      const response = await axios.put(`/api/orders/update/${orderId}`, {
        status: newOrderStatus
      })
      dispatch(updatedOrder(response.data))
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
  oneOrderIsFetching: true,
  allOrders: []
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
    case GOT_ALL_ORDERS:
      return {...state, allOrders: action.list, allOrdersAreFetching: false}
    case REQUEST_ALL_ORDERS:
      return {...state, allOrdersAreFetching: true}
    case UPDATED_ORDER:
      return {...state, oneOrder: action.order, allOrdersAreFetching: false}
    case REQUEST_UPDATE_ORDER:
      return {...state, allOrdersAreFetching: true}
    default:
      return state
  }
}

export default orderReducer
