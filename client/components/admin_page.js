import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {createBook, fetchAllBooksFromServer, editBook} from '../store/books'
import {Form, Container} from 'semantic-ui-react'

class AdminPage extends Component {
  componentDidMount() {
    this.props.fetchAllBooksFromServer()
  }
  handleSubmit(event) {
    event.preventDefault()
    if (this.props.adminForm.values.selectedBook) {
      this.props.editBook(this.props.adminForm.values)
    } else {
      this.props.createBook(this.props.adminForm.values)
    }
  }
  render() {
    const books = this.props.list
    const isFetching = this.props.isFetching
    if (isFetching) {
      return <h1>Loading</h1>
    }
    if (!this.props.user.isAdmin)
      return <h1>sorry can't access this page :( ADMINS ONLY</h1>
    return (
      <Container>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <h2>Update/Add a book here:</h2>
          </div>
          <div>
            <h4>book to update:</h4>
            <Field name="selectedBook" component="select">
              <option />
              {books.map(book => <option>{book.name}</option>)}
            </Field>
          </div>
          <h6>Name:</h6>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Title"
          />

          <h6>Genres:</h6>
          <Field
            name="genres"
            component="input"
            type="text"
            placeholder="Genres"
          />

          <h6>Author:</h6>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Author"
          />

          <h6>Price:</h6>
          <Field
            name="price"
            component="input"
            type="number"
            placeholder="Price"
          />

          <h6>Quantity:</h6>
          <Field
            name="quantity"
            component="input"
            type="number"
            placeholder="Quantity"
          />

          <h6>Edition Type:</h6>
          <Field name="editionType" component="select">
            <option />
            <option>hardcover</option>
            <option>paperback</option>
          </Field>

          <h6>Description:</h6>
          <Field
            name="description"
            component="input"
            type="text"
            placeholder="Description"
          />

          <button type="submit" label="submit">
            Submit
          </button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  list: state.books.list,
  adminForm: state.form.adminForm,
  isFetching: state.books.isFetching,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  createBook: book => dispatch(createBook(book)),
  editBook: book => dispatch(editBook(book)),
  fetchAllBooksFromServer: () => dispatch(fetchAllBooksFromServer())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({form: 'adminForm'})(AdminPage)
)
