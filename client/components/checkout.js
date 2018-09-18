import React, {Component} from 'react'
import {CheckOutForm} from './index'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {Header} from 'semantic-ui-react'

const cssStyling = {
  checkout: {
    margin: '0 auto',
    maxWidth: '800px',
    boxSizing: 'border-box',
    padding: '0 5px'
  }
}

class CheckOut extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.STRIPE_PUBLISHABLE_KEY}>
        <div styling={cssStyling.checkout} className="example">
          <Header as='h1' color='grey'>Checkout</Header>
          <Elements>
            <CheckOutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default CheckOut
