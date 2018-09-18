import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Item, Button, Icon, Header, Divider} from 'semantic-ui-react'
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

  //this event handler takes in a while book rather than an ID so as to check the books quantity
  removeQuantity = async event => {
    console.log(event)
    if (event.cartQuantity > 1) {
      if (this.props.user.id) {
        await this.props.decreaseCartQuantityServer(event.id)
        this.calculateTotalPrice()
      } else {
        await this.props.decreaseCartQuantity(event.id)
        this.calculateTotalPrice()
      }
    } else {
      this.handleRemove(event.id)
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
      return (
        <Container textAlign="center">
          <Divider hidden />
          <Header as="h2" icon>
            <Icon name="shopping cart" />
            Cart is currently empty
          </Header>
        </Container>
      )
    }
    return (
      <Container>
        <h2>My Cart</h2>
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
                        onClick={() => this.removeQuantity(item)}
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
          <Button basic color="black" as={Link} to="/checkout" fluid>
            Checkout
          </Button>
        </Item.Group>
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
