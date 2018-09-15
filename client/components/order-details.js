import React, {Component} from 'react'
import {Segment, Dimmer, Loader, Image, Item, Header} from 'semantic-ui-react'
import {fetchOneUserOrderFromServer} from '../store/orders'
import {prettyDate, prettyDollar} from './users-order-history'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    fetchOneUserOrderFromServer: (userId, orderId) =>
      dispatch(fetchOneUserOrderFromServer(userId, orderId))
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.oneOrder,
    isFetching: state.order.isFetching
  }
}

class UserOneOrder extends Component {
  componentDidMount() {
    const accountId = this.props.match.params.accountId
    const orderId = this.props.match.params.orderId
    this.props.fetchOneUserOrderFromServer(accountId, orderId)
  }
  render() {
    const order = this.props.order
    const isFetching = this.props.isFetching

    if (isFetching) {
      return (
        <Segment>
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>

          <Image src="http://www.clker.com/cliparts/R/w/q/4/j/l/book.svg" />
        </Segment>
      )
    }
    return (
      <div>
        {' '}
        <Header as="h2" attached="top">
          Order Placed on {prettyDate(order.date)}
          <Header.Subheader>
            Total {prettyDollar(order.totalPrice)}
          </Header.Subheader>
          <Header.Subheader>Status: {order.status}</Header.Subheader>
        </Header>
        <Item.Group>
          {order.order_books.map(product => {
            return (
              <Item key={product.id}>
                <Item.Image
                  size="tiny"
                  src="http://www.clker.com/cliparts/R/w/q/4/j/l/book.svg"
                />
                <Item.Content>
                  <Item.Header as={Link} to={`/book/${product.book.id}`}>
                    {product.quantity > 1
                      ? product.quantity + ' of ' + product.book.name
                      : product.book.name}
                  </Item.Header>
                  <Item.Meta content={prettyDollar(product.price)} />
                  <Item.Description>
                    {product.book.description}
                  </Item.Description>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
        <Header
          as={Link}
          to={`/user/${this.props.match.params.accountId}/orders`}
          attached="bottom"
        >
          Back to All Orders
        </Header>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOneOrder)
