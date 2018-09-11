import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {createBook} from '../store/books'

class AdminPage extends Component {
  state = {
    selectedBook: {}
  }
  handleSubmit() {
    event.preventDefault()
    this.props.createBook()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2>Update/Add a book here:</h2>
        </div>
        <div>
          <h4>book to update:</h4>
          <Field name="selectedBook" component="select">
            <option />
          </Field>
        </div>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Title"
          />
        </div>
        <div>
          <Field
            name="genres"
            component="input"
            type="text"
            placeholder="Genres"
          />
        </div>
        <div>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Author"
          />
        </div>
        <div>
          <Field
            name="price"
            component="input"
            type="number"
            placeholder="Price"
          />
        </div>
        <div>
          <Field
            name="quantity"
            component="input"
            type="number"
            placeholder="Quantity"
          />
        </div>
        <div>
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

const mapDispatchToProps = dispatch => ({
  createBook: () => dispatch(createBook())
})

export default connect(null, mapDispatchToProps)(
  reduxForm({form: 'adminForm'})(AdminPage)
)
