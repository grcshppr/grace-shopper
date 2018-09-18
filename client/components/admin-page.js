import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {createBook, fetchAllBooksFromServer, editBook} from '../store/books'
import {Form, Container, Button, Divider} from 'semantic-ui-react'

class AdminPage extends Component {
  componentDidMount() {
    this.props.fetchAllBooksFromServer()
  }
  handleSubmit() {
    if (this.props.adminForm.values.id) {
      this.props.editBook(this.props.adminForm.values)
    } else {
      this.props.createBook(this.props.adminForm.values)
    }
  }

  getBookInfo(event) {
    const bookInfo = this.props.list.filter(
      book => book.id == event.target.value
    )
    this.props.initialize(bookInfo[0])
  }

  render() {
    const books = this.props.list
    const isFetching = this.props.isFetching
    if (isFetching) {
      return <h3>Loading</h3>
    }
    if (!this.props.user.isAdmin)
      return <h3>sorry can't access this page :( ADMINS ONLY</h3>
    return (
      <Container>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <h4>Update/Add a book here:</h4>
          </div>
          <div>
            <select
              name="selectedBook"
              component="select"
              onChange={this.getBookInfo.bind(this)}
            >
              <option placeholder="Book to Update" />
              {books.map(book => (
                <option key={book.id} value={book.id}>
                  {book.name} ({book.editionType})
                </option>
              ))}
            </select>
          </div>
          <h5>Name:</h5>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Title"
          />
          <h5>Genres:</h5>
          <Field
            name="genres"
            component="input"
            type="text"
            placeholder="Genres"
          />
          <h5>Author:</h5>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Author"
          />
          <h5>Price:</h5>
          <Field
            name="price"
            component="input"
            type="number"
            placeholder="Price"
          />
          <h5>Quantity:</h5>
          <Field
            name="quantity"
            component="input"
            type="number"
            placeholder="Quantity"
          />
          <h5>Availibility:</h5>
          <Field name="availability" component="input" type="checkbox" />
          <h5>Edition Type:</h5>
          <Field name="editionType" component="select">
            <option />
            <option>hardcover</option>
            <option>paperback</option>
          </Field>
          <h5>Description:</h5>
          <Field
            name="description"
            component="textarea"
            type="text"
            placeholder="Description"
          />
          <Divider hidden />
          <Button onClick={() => this.handleSubmit()}>Submit</Button>
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
