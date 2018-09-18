import React, {Component} from 'react'
import {CheckOutForm} from './index'
import {Elements, StripeProvider} from 'react-stripe-elements'

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
          <h1>Checkout Page</h1>
          <Elements>
            <CheckOutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default CheckOut
