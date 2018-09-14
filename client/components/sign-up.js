import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Container, Divider, Form} from 'semantic-ui-react'
import {auth} from '../store'

class SignUp extends Component {
  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    return (
      <Container>
        <h1>SIGN UP HERE</h1>
        <Form onSubmit={this.handleSubmit.bind(this)} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  signUpForm: state.form.signUpForm
})
const mapDispatchToProps = dispatch => ({
  auth: (newUser, signup) => dispatch(auth)
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({form: 'signUpForm'})(SignUp)
)
