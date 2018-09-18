import React, {Component} from 'react'
import user from '../store/user'
import {gotOrderInformation} from '../store/orders'
import {Field, reduxForm} from 'redux-form'
import {Form, Label, Container, Divider, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const stateArray = [
  'AK',
  'AL',
  'AR',
  'AS',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'GU',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VI',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY'
]

const state = value =>
  stateArray.indexOf(value) === -1
    ? 'Must be Valid State Abbreviation'
    : undefined

const required = value =>
  value || typeof value === 'number' ? undefined : 'Required'

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const maxLength5 = maxLength(5)

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

const minLength5 = minLength(5)

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
            validate={required}
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
            validate={[required, state]}
            component="input"
            type="text"
          />
          <h6>Zip Code:</h6>
          <Field
            name="zipCode"
            label="zipCode"
            validate={[required, minLength5, maxLength5]}
            component="input"
            type="text"
          />
          <h6>email:</h6>
          <Field
            name="email"
            label="email"
            validate={email}
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
