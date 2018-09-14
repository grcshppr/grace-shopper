import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createReview} from '../store/reviews'
import {Field, reduxForm} from 'redux-form'
import {Form, Container, Divider} from 'semantic-ui-react'

//BEFORE THIS WORK IN STORE AND REDUCER

class WriteReview extends Component {
  handleSumbit(event) {
    event.preventDefault()
    const bookId = this.props.selectedBook.id
    const review = this.props.reviewForm.values
    this.props.createReview(bookId, review)
  }

  render() {
    return (
      <Container textAlign="left" className="formcontainer">
        <h4>Write a review for this book:</h4>
        <Form onSubmit={() => this.handleSumbit}>
          <h6>Title:</h6>
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="title"
          />
          <h6>Rating:</h6>
          <Field
            name="stars"
            component="input"
            type="number"
            placeholder="rating 0-5"
          />
          <h6>Content:</h6>
          <Field
            name="content"
            component="textarea"
            type="text"
            placeholder="content"
          />
          <Divider hidden />
          <button type="submit" label="submit">
            Submit
          </button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  reviewForm: state.form.reviewForm
})

const mapDispatchToProps = dispatch => ({
  createReview: (bookId, review) => dispatch(createReview(bookId, review))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({form: 'reviewForm'})(WriteReview)
)
