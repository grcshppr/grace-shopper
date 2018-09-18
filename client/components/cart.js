import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
  Grid,
  GridColumn,
  Image,
  Container,
  Item,
  Button,
  Icon
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
    await this.props.destroyItemFromCart(event)
    this.calculateTotalPrice()
  }

  removeQuantity = async event => {
    if (this.props.user.id) {
      await this.props.decreaseCartQuantityServer(event)
      this.calculateTotalPrice()
    } else {
      await this.props.decreaseCartQuantity(event)
      this.calculateTotalPrice()
    }
  }

  addQuantity = async event => {
    if (this.props.user.id) {
      await this.props.increaseCartQuantityServer(event)
      this.calculateTotalPrice()
    } else {
      await this.props.increaseCartQuantity(event)
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
                  <Button
                    key={item.id}
                    onClick={() => this.handleRemove(item.id)}
                    basic
                    content="Remove"
                    floated="right"
                    size="small"
                  />
                  <Item.Meta>by {item.author}</Item.Meta>
                  <Item.Meta>{prettyDollar(item.price)}</Item.Meta>
                  <Item.Meta>
                    Quantity: {item.cartQuantity}
                    <Button.Group icon size="mini">
                      <Button
                        onClick={() => this.removeQuantity(item.id)}
                        icon="minus circle"
                        basic
                      />
                      <Button
                        onClick={() => this.addQuantity(item.id)}
                        icon="add circle"
                        basic
                      />
                    </Button.Group>
                  </Item.Meta>
                  <Item.Description>
                    {item.description.slice(0, 200)}...
                  </Item.Description>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
        <Button floated="right">Checkout</Button>
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
