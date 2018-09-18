import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Container,
  Item,
  Button
} from 'semantic-ui-react'
import {prettyDollar} from '../utils'
import {
  fetchCartItems,
  destroyItemFromCart,
  removeItemFromCart,
  gotCartItems,
  decreaseCartQuantityServer,
  increaseCartQuantityServer,
  decreaseCartQuantity,
  increaseCartQuantity
} from '../store/cart'
import {me} from '../store/user'

class Cart extends Component {
  state = {
    totalPrice: 0
  }

  calculateTotalPrice() {
    let tempPrice = 0
    this.props.cart.map(item => {
      const itemPrice = item.price * item.cartQuantity
      tempPrice += itemPrice
    })
    this.setState({totalPrice: tempPrice})
  }

  async componentDidMount() {
    await this.props.me()
    if (this.props.user.id) {
      await this.props.fetchCartItems()
    } else {
      this.props.gotCartItems(this.props.cart)
    }
    this.calculateTotalPrice()
  }

  handleRemove = async event => {
    await this.props.destroyItemFromCart(event.target.value)
    this.calculateTotalPrice()
  }

  removeQuantity = async event => {
    if (this.props.user.id) {
      await this.props.decreaseCartQuantityServer(event.target.value)
      this.calculateTotalPrice()
    } else {
      await this.props.decreaseCartQuantity(event.target.value)
      this.calculateTotalPrice()
    }
  }

  addQuantity = async event => {
    if (this.props.user.id) {
      await this.props.increaseCartQuantityServer(event.target.value)
      this.calculateTotalPrice()
    } else {
      await this.props.increaseCartQuantity(event.target.value)
      this.calculateTotalPrice()
    }
  }

  render() {
    if (!this.props.cart.length) {
      return <h1>Loading/nothing in cart</h1>
    }
    return (
      <Container>
        <h1>My Cart</h1>
        <Container textAlign="left" fluid>
          <h4>Total price: {prettyDollar(this.state.totalPrice)} </h4>
        </Container>
        <Item.Group divided>
          {this.props.cart.map(item => {
            return (
              <Item key={item.id}>
                <Item.Image src={item.imgUrl} size="small" />
                <Item.Content>
                  <Item.Header>{item.name}</Item.Header>
                  <Item.Meta>by {item.author}</Item.Meta>
                  <Item.Meta>{prettyDollar(item.price)}</Item.Meta>
                  <Item.Meta>Quantity: {item.cartQuantity}</Item.Meta>
                  <Item.Description>
                    {item.description.slice(0, 200)}...
                  </Item.Description>
                  <button
                    key={item.id}
                    value={item.id}
                    onClick={this.handleRemove}
                  >
                    remove all
                  </button>
                  <button value={item.id} onClick={this.removeQuantity}>
                    -
                  </button>
                  <button value={item.id} onClick={this.addQuantity}>
                    +
                  </button>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
        <Button as={Link} to="/checkout">
          Checkout
        </Button>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCartItems: () => dispatch(fetchCartItems()),
    destroyItemFromCart: book => dispatch(destroyItemFromCart(book)),
    removeItemFromCart: book => dispatch(removeItemFromCart(book)),
    gotCartItems: list => dispatch(gotCartItems(list)),
    me: () => dispatch(me()),
    decreaseCartQuantityServer: bookId =>
      dispatch(decreaseCartQuantityServer(bookId)),
    increaseCartQuantityServer: bookId =>
      dispatch(increaseCartQuantityServer(bookId)),
    decreaseCartQuantity: bookId => dispatch(decreaseCartQuantity(bookId)),
    increaseCartQuantity: bookId => dispatch(increaseCartQuantity(bookId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
