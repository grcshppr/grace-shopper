import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {createBook, fetchAllBooksFromServer, editBook} from '../store/books'

class AdminPage extends Component {
  componentDidMount() {
    this.props.fetchAllBooksFromServer()
  }
  handleSubmit(event) {
    event.preventDefault()
    if (this.props.adminForm.values.selectedBook) {
      console.log('did i get here?')
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
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
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
        <div>
          <h6>Name:</h6>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Title"
          />
        </div>
        <div>
          <h6>Genres:</h6>
          <Field
            name="genres"
            component="input"
            type="text"
            placeholder="Genres"
          />
        </div>
        <div>
          <h6>Author:</h6>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Author"
          />
        </div>
        <div>
          <h6>Price:</h6>
          <Field
            name="price"
            component="input"
            type="number"
            placeholder="Price"
          />
        </div>
        <div>
          <h6>Quantity:</h6>
          <Field
            name="quantity"
            component="input"
            type="number"
            placeholder="Quantity"
          />
        </div>
        <div>
          <h6>Edition Type:</h6>
          <Field name="editionType" component="select">
            <option />
            <option>hardcover</option>
            <option>paperback</option>
          </Field>
        </div>
        <div>
          <h6>Description:</h6>
          <Field
            name="description"
            component="input"
            type="text"
            placeholder="Description"
          />
        </div>
        <button type="submit" label="submit">
          Submit
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  list: state.books.list,
  adminForm: state.form.adminForm,
  isFetching: state.books.isFetching
})
const mapDispatchToProps = dispatch => ({
  createBook: book => dispatch(createBook(book)),
  editBook: book => dispatch(editBook(book)),
  fetchAllBooksFromServer: () => dispatch(fetchAllBooksFromServer())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({form: 'adminForm'})(AdminPage)
)
