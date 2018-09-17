//Store for all users, for admin view, as opposed to the currently logged in user
import axios from 'axios'

//Action Types
export const GOT_ALL_USERS = 'GOT_ALL_USERS'
export const REQUEST_ALL_USERS = 'REQUEST_ALL_USERS'

//Action Creators
const gotAllUsersFromServer = users => ({type: GOT_ALL_USERS, users})
const requestAllUsersFromServer = () => ({type: REQUEST_ALL_USERS})

//Thunk Creators
export const fetchAllUsersFromServer = () => {
  return async dispatch => {
    dispatch(requestAllUsersFromServer())
    const response = await axios.get('/api/users/detailed')
    dispatch(gotAllUsersFromServer(response.data))
  }
}

//Reducer
const initialState = {
  users: [],
  isFetching: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_USERS:
      return {...state, users: action.users, isFetching: false}
    case REQUEST_ALL_USERS:
      return {...state, isFetching: true}
    default:
      return state
  }
}
