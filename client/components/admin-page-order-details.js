import React, {Component} from 'react'
import {
  Item,
  Header,
  Segment,
  Dimmer,
  Container,
  Loader,
  Divider
} from 'semantic-ui-react'
import {fetchOneUserOrderFromServer, updateOrder} from '../store/orders'
import {prettyDate, prettyDollar} from '../utils'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    fetchOneOrderFromServer: orderId =>
      dispatch(fetchOneUserOrderFromServer(orderId)),
    updateOrder: (orderId, status) => dispatch(updateOrder(orderId, status))
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.oneOrder,
    isFetching: state.order.oneOrderIsFetching
  }
}

class AdminOrderDetailsPage extends Component {
  constructor() {
    super()
    this.state = {selected: ''}
  }

  handleSumbit = event => {
    event.preventDefault()
    const orderId = this.props.match.params.orderId
    this.props.updateOrder(orderId, this.state.selected)
  }
  handleChange = event => {
    this.setState({
      selected: event.target.value
    })
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.fetchOneOrderFromServer(orderId)
  }
  render() {
    const isFetching = this.props.isFetching
    const order = this.props.order

    if (isFetching) {
      return (
        <Segment>
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        </Segment>
      )
    }
    return (
      <div>
        <Header as="h3" attached="top">
          Order Placed on {prettyDate(order.date)}
          {order.user && `by ${order.user.email}`}
          <Header.Subheader>
            Total {prettyDollar(order.totalPrice)}
          </Header.Subheader>
          <Header.Subheader>Status: {order.status}</Header.Subheader>
        </Header>
        <Header as="h5" attached>
          Update Order Status:
          <Divider hidden fitted />
          <div />
          <form onSubmit={this.handleSumbit}>
            <select onChange={this.handleChange}>
              <option value="" selected disabled hidden>
                -
              </option>
              <option value="created">created</option>
              <option value="processing">processing</option>
              <option value="canceled">canceled</option>
              <option value="completed">completed</option>
            </select>
            <Divider hidden fitted />
            <button type="submit">update</button>
          </form>
        </Header>
        <Divider hidden />
        <Container fluid>
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
        </Container>
        <Divider clearing />
        <Header as={Link} to="/admin/orders" attached="bottom">
          Back to All Orders
        </Header>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AdminOrderDetailsPage
)
