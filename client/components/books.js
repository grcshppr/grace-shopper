import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {prettyDollar} from '../utils'
import {createNewCartItem, addItemToCart} from '../store/cart'
import {
  Dropdown,
  Image,
  Container,
  Button,
  Divider,
  Item
} from 'semantic-ui-react'

const mapDispatchToProps = dispatch => ({
  createNewCartItem: bookId => dispatch(createNewCartItem(bookId)),
  addItemToCart: book => dispatch(addItemToCart(book))
})

const mapStateToProps = state => {
  return {
    list: state.books.list,
    genres: state.books.genres,
    isFetching: state.books.isFetching,
    user: state.user
  }
}

class Books extends Component {
  constructor() {
    super()
    this.state = {
      selectedGenre: 'all'
    }
  }

  handleFilter = event => {
    this.setState({
      selectedGenre: event.target.value
    })
  }

  handleCartUser = event => {
    this.props.createNewCartItem({id: event.target.value})
  }
  handleCartGuest = event => {
    const cartBook = this.props.list.filter(
      book => book.id == event.target.value
    )
    this.props.addItemToCart(cartBook[0])
  }

  render() {
    const availableBooks = this.props.list.filter(
      book => book.availability === true && book.quantity > 0
    )
    let books
    if (this.state.selectedGenre === 'all') {
      books = availableBooks
    } else {
      books = availableBooks.filter(
        book => book.genres.indexOf(this.state.selectedGenre) !== -1
      )
    }
    const genres = this.props.genres

    const isFetching = this.props.isFetching
    if (isFetching) {
      return <h1>Loading</h1>
    }

    return (
      <Container>
        <h4>Filter:</h4>
        <select onChange={this.handleFilter}>
          <option value="all">All</option>
          {genres.map((genre, id) => (
            <option value={genre} key={id}>
              {genre}
            </option>
          ))}
        </select>

        <Divider section />

        <Item.Group divided>
          {books.map(book => {
            return (
              <Item key={book.id}>
                <Item.Image src={book.imgUrl} size="small" />
                <Item.Content>
                  <Item.Header as={Link} to={`book/${book.id}`}>
                    {book.name}
                  </Item.Header>
                  <Item.Meta>by {book.author}</Item.Meta>
                  <Item.Meta>{prettyDollar(book.price)}</Item.Meta>
                  <Item.Description>
                    {book.description.slice(0, 200)}...
                  </Item.Description>
                  {this.props.user.id ? (
                    <button value={book.id} onClick={this.handleCartUser}>
                      add to cart
                    </button>
                  ) : (
                    <button value={book.id} onClick={this.handleCartGuest}>
                      add to cart
                    </button>
                  )}
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
