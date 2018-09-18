import React, {Component} from 'react'

import {gotOrderInformation} from '../store/orders'
import {Field, reduxForm} from 'redux-form'
import {Form, Container, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => ({
  orderForm: state.form.orderForm
})

const mapDispatchToProps = dispatch => ({
  gotOrderInformation: information => dispatch(gotOrderInformation(information))
})

class OrderForm extends Component {
  handleSubmit = event => {
    event.preventDefault()
    const orderInformation = this.props.orderForm.values
    this.props.gotOrderInformation(orderInformation)
    this.props.history.push('/makepayment')
  }
  render() {
    return (
      <Container textAlign="left" className="formcontainer">
        <h4>Fill Out Order Details:</h4>
        <Form onSubmit={this.handleSubmit}>
          <h6>Full Name:</h6>
          <Field name="fullName" component="input" type="text" />
          <h6>Street Address:</h6>
          <Field
            name="streetAddress"
            label="streetAddress"
            component="input"
            type="text"
            placeholder="Street and number, P.O. box, c/o"
          />
          <h6>City:</h6>
          <Field name="city" label="city" component="input" type="text" />
          <h6>State / Province / Region:</h6>
          <Field
            name="state"
            label="state"
            component="input"
            type="text"
          />
          <h6>Zip Code:</h6>
          <Field
            name="zipCode"
            label="zipCode"
            component="input"
            type="text"
          />
          <h6>email:</h6>
          <Field
            name="email"
            label="email"
            component="input"
            type="text"
          />
          <Divider hidden />
          <button type="submit">Continue To Payment</button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({form: 'orderForm'})(OrderForm)
  )
)
