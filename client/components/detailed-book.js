import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchReviewsForBook} from '../store/reviews.js'
import Reviews from './reviews'
import {withRouter} from 'react-router-dom'
import {Container, Image, Divider} from 'semantic-ui-react'
import {prettyDollar} from '../utils'
import WriteReview from './write-review'

export class DetailedBook extends Component {
  async componentDidMount() {
    //Fetch reviews from API for the single selected book
    let selectedBookId = Number(this.props.match.params.id)
    await this.props.fetchReviewsForBook(selectedBookId)
  }
  render() {
    //We get bookId from url bar and then use it to find the book from props
    let selectedBook
    let selectedBookId = Number(this.props.match.params.id)
    if (this.props.books) {
      selectedBook = this.props.books.list.find(
        book => book.id === selectedBookId
      )
    }
    const reviews = this.props.reviews
    return (
      <div>
        {selectedBook && (
          <Container textAlign="center">
            <h2>{selectedBook.name}</h2>
            <h4>{`by ${selectedBook.author}`}</h4>
            <Image size="small" src={`/${selectedBook.imgUrl}`} centered />
            <h5>{prettyDollar(selectedBook.price)}</h5>
            {!selectedBook.quantity && <h5>Out of stock</h5>}
            <h5>{`Format: ${selectedBook.editionType}`}</h5>
            {selectedBook.publisher && (
              <h6>{`Publisher: ${selectedBook.publisher}`}</h6>
            )}
            <p>{selectedBook.description}</p>
            <Divider hidden />

            {reviews && (
              <Reviews selectedBook={selectedBook} reviews={reviews} />
            )}
            <WriteReview selectedBook={selectedBook} />
          </Container>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    reviews: state.reviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReviewsForBook: bookId => dispatch(fetchReviewsForBook(bookId))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailedBook)
)
