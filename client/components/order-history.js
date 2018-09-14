import React from 'react'
import {Image as ImageComponent, Item, Loader} from 'semantic-ui-react'
import {fetchUsersOrdersFromServer} from '../store/order-history'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersOrdersFromServer: () => dispatch(fetchUsersOrdersFromServer())
  }
}

const maptStateToProps = state => {
    return {
        list: state.orders.usersOrders,
        isFetching: state.orders.isFetching
    }
}

class UsersOrders extends Component {
  
  render () {
    const list = this.props.list
    const isFetching = this.props.isFetching
    if(isFetching) {
      return (

      )
    }
    return (
      <Item.Group link>
      {
        list.map(order => {
          <Item as={Link} to={`/users/${order.userId}/orders/${order.id}`}>
            <Item.Icon name='book' size='huge' />
            <Item.Content>
              <Item.Header>Order Placed on {order.date.toDateString()}</Item.Header>
              <Item.Description>Total ${order.order_books.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity))}</Item.Description>
            </Item.Content>
          </Item>
        })
      }
      </Item.Group>
    )
  }
}
