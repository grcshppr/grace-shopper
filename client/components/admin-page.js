import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {createBook, fetchAllBooksFromServer, editBook} from '../store/books'
import {Form, Container, Card} from 'semantic-ui-react'
import AdminForm from './admin-form'

class AdminPage extends Component {
  render() {
    return (
      <Container>
        <h1>this is Admin Page </h1>
        <Card fluid>
          <AdminForm />
        </Card>
      </Container>
    )
  }
}

export default AdminPage
