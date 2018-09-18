import React, {Component} from 'react'
import {
  Segment,
  Dimmer,
  Loader,
  Image,
  Item,
  Header,
  Container
} from 'semantic-ui-react'
import {fetchOneUserOrderFromServer} from '../store/orders'
import {prettyDate, prettyDollar} from '../utils'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    fetchOneUserOrderFromServer: (orderId, userId) =>
      dispatch(fetchOneUserOrderFromServer(orderId, userId))
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.oneOrder,
    isFetching: state.order.oneOrderIsFetching,
    user: state.user
  }
}

class UserOneOrder extends Component {
  componentDidMount() {
    const accountId = this.props.match.params.accountId
    const orderId = this.props.match.params.orderId
    this.props.fetchOneUserOrderFromServer(orderId, accountId)
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

          <Image src="/img/book" />
        </Segment>
      )
    }
    if (
      this.props.user.id === Number(this.props.match.params.accountId) ||
      this.props.user.isAdmin
    ) {
      return (
        <Container>
          {' '}
          <Header as="h2" attached="top">
            Order Placed on {prettyDate(order.date)}
            <Header.Subheader>
              Total {prettyDollar(order.totalPrice)}
            </Header.Subheader>
            <Header.Subheader>Status: {order.status}</Header.Subheader>
            <Header.Subheader>Order ID: {order.id}</Header.Subheader>
          </Header>
          <Item.Group>
            {order.order_books.map(product => {
              return (
                <Item key={product.id}>
                  <Item.Image size="tiny" src={`/${product.book.imgUrl}`} />
                  <Item.Content>
                    <Item.Header as={Link} to={`/book/${product.book.id}`}>
                      {product.quantity > 1
                        ? product.quantity + 'x ' + product.book.name
                        : product.book.name}
                    </Item.Header>
                    <Item.Meta content={`by ${product.book.author}`} />
                    {product.quantity > 1 ? (
                      <Item.Meta
                        content={`${product.quantity}x ${prettyDollar(
                          product.price
                        )}`}
                      />
                    ) : (
                      <Item.Meta content={prettyDollar(product.price)} />
                    )}
                    <Item.Meta
                      content={'Edition:  ' + product.book.editionType}
                    />
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
        </Container>
      )
    } else {
      return <h1>Sorry, You Don't Have Access!</h1>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOneOrder)
