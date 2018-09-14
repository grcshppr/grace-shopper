import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchReviewsForBook} from '../store/reviews.js'
import Reviews from './reviews'
import {withRouter} from 'react-router-dom'

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
          <div>
            <h2>{selectedBook.name}</h2>
            <h4>{`by ${selectedBook.author}`}</h4>
            <img src={selectedBook.imgUrl} />
            <h5>
              {/* Book price is an integer in db, so we need to reformat it as a price */}
              {`$${selectedBook.price
                .toString()
                .slice(0, -2)}.${selectedBook.price.toString().slice(-2)}`}
            </h5>
            {!selectedBook.quantity && <h5>Out of stock</h5>}
            <h6>{`Format: ${selectedBook.editionType}`}</h6>
            {selectedBook.publisher && (
              <h6>{`Publisher: ${selectedBook.publisher}`}</h6>
            )}
            {reviews && (
              <Reviews selectedBook={selectedBook} reviews={reviews} />
            )}
          </div>
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
