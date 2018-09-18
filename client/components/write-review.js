import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createReview} from '../store/reviews'
import {Field, reduxForm} from 'redux-form'
import {Form, Container, Divider, Button} from 'semantic-ui-react'

class WriteReview extends Component {
  handleSumbit = () => {
    const bookId = this.props.selectedBook.id
    const review = this.props.reviewForm.values
    this.props.createReview(bookId, review)
  }

  render() {
    return (
      <Container textAlign="left" className="formcontainer">
        <Divider />
        <h4>Write a review for this book:</h4>
        <Form onSubmit={this.handleSumbit}>
          <h5>Title:</h5>
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="title"
          />
          <h5>Rating:</h5>
          <Field
            name="stars"
            component="input"
            type="number"
            placeholder="rating 0-5"
          />
          <h5>Content:</h5>
          <Field
            name="content"
            component="textarea"
            type="text"
            placeholder="content"
          />
          <Divider hidden />
          <Button basic onClick={() => this.handleSumbit()}>
            Add Review
          </Button>
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
