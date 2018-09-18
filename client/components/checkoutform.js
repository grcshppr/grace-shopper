import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe
} from 'react-stripe-elements'
import {Header, Icon, Button} from 'semantic-ui-react'

const handleBlur = () => {
  console.log('[blur]')
}
const handleChange = change => {
  console.log('[change]', change)
}
const handleFocus = () => {
  console.log('[focus]')
}
const handleReady = () => {
  console.log('[ready]')
}

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '30px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  }
}
const cssStyling = {
  checkout: {
    margin: '0 auto',
    maxWidth: '800px',
    boxSizing: 'border-box',
    padding: '0 5px'
  },
  label: {
    color: '#6b7c93',
    fontWeight: '300',
    letterSpacing: '0.025em',
    fontSize: '30px',
    marginBottom: '20px'
  },
  button: {
    whiteSpace: 'nowrap',
    border: '0',
    outline: '0',
    display: 'inline-block',
    height: '50px',
    lineHeight: '40px',
    boxShadow: '0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    backgroundColor: '#6772e5',
    textDecoration: 'none',
    WebkitTransition: 'all 150ms ease',
    transition: 'all 150ms ease',
    marginTop: '10px'
  },
  form: {
    marginBottom: '40px',
    marginLeft: '40px',
    borderBottom: '3px solid #e6ebf1'
  },
  input: {
    backgroundColor: 'white',
    height: '40px',
    borderRadius: '4px',
    border: '1px solid transparent',
    boxShadow: '0 1px 3px 0 #e6ebf1',
    marginBottom: '20px'
  }
}

const mapStateToProps = state => ({
  orderInformation: state.order.orderInformation,
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  clearCart: cart => dispatch(clearCart(cart))
})

class SplitForm extends Component {
  constructor() {
    super()
    this.state = {
      completed: false,
      user: false,
      orderNumber: 0,
      email: ''
    }
  }
  handleSubmit = async ev => {
    const orderInformation = this.props.orderInformation
    ev.preventDefault()
    let {token} = await this.props.stripe.createToken({
      name: orderInformation.fullName
    })
    let response = await axios.post('/charge', {
      headers: {'Content-Type': 'text/plain'},
      token: token.id,
      streetAddress: orderInformation.streetAddress,
      state: orderInformation.state,
      city: orderInformation.city,
      zipcode: orderInformation.zipCode,
      name: orderInformation.fullName,
      email: orderInformation.email,
      userId: this.props.user.id,
      cart: this.props.cart
    })
    if (response.data.status === 'succeeded') {
      const clearedCart = []
      this.props.clearCart(clearedCart)
      if (this.props.user.id) {
        this.setState({
          completed: true,
          user: true,
          orderNumber: response.data.newOrderId,
          email: response.data.email
        })
      } else {
        this.setState({
          completed: true,
          orderNumber: response.data.newOrderId,
          email: response.data.email
        })
      }
    }
  }
  render() {
    if (
      !this.props.orderInformation.fullName ||
      !this.props.orderInformation.email
    ) {
      return <h1>Fill Out Order Details Before Checkout!</h1>
    }
    if (this.state.completed && this.state.user) {
      return (
        <div>
          <Header as="h2" attached="top" icon>
            <Icon name="check circle" color="green" />
            You're All Set!!
            <Header.Subheader>
              {' '}
              Order Number: {this.state.orderNumber}
            </Header.Subheader>
            <Header.Subheader>
              Order details have been sent to {this.state.email}
            </Header.Subheader>
          </Header>
          <Button
            as={Link}
            to={`/user/${this.props.user.id}/orders`}
            attached="bottom"
            positive
          >
            Back to All Orders
          </Button>
        </div>
      )
    } else if (this.state.completed && !this.state.user) {
      return (
        <div>
          <Header as="h2" attached="top" icon>
            <Icon name="check circle" color="green" />
            You're All Set!!
            <Header.Subheader>
              {' '}
              Order Number: {this.state.orderNumber}
            </Header.Subheader>
            <Header.Subheader>
              Order details have been sent to {this.state.email}
            </Header.Subheader>
          </Header>
        </div>
      )
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label style={cssStyling.label}>
          Card number
          <CardNumberElement
            style={cssStyling.input}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions()}
          />
        </label>
        <label style={cssStyling.label}>
          Expiration date
          <CardExpiryElement
            style={cssStyling.input}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions()}
          />
        </label>
        <label style={cssStyling.label}>
          CVC
          <CardCVCElement
            style={cssStyling.input}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions()}
          />
        </label>
        <label style={cssStyling.label}>
          Postal code
          <PostalCodeElement
            style={cssStyling.input}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions()}
          />
        </label>
        <button type="submit" style={cssStyling.button}>
          Pay
        </button>
      </form>
    )
  }
}

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(SplitForm)
)
