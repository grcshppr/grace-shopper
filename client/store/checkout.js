import axios from 'axios'

export const createOrder = (userId, token, cartItems) => {
  return async dispatch => {
    try {
      const order = await axios.post('/api/order', {userId, token})
      const orderId = order.id
      await axios.post('/api/orderbooks', cartItems, orderId)
    } catch (error) {
      console.error(error)
    }
  }
}

exampleOrderItems = [{bookId: 3, quantity: 2, orderId: orderId}]
