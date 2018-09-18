import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchReviewsForBook} from '../store/reviews.js'
import Reviews from './reviews'
import {withRouter} from 'react-router-dom'
import {Container, Image, Divider, Item} from 'semantic-ui-react'
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
      <Container>
        {selectedBook && (
          <Item.Group>
            <Item>
              <Item.Image src={`/${selectedBook.imgUrl}`} />
              <Item.Content>
                <Item.Header>{selectedBook.name}</Item.Header>
                <Item.Meta>by {selectedBook.author}</Item.Meta>
                <Item.Meta>{prettyDollar(selectedBook.price)}</Item.Meta>
                <Item.Meta>Format: {selectedBook.editionType}</Item.Meta>
                <Item.Description>{selectedBook.description}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        )}
        {reviews && <Reviews selectedBook={selectedBook} reviews={reviews} />}
        <WriteReview selectedBook={selectedBook} />
      </Container>
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
