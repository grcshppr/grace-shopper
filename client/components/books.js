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

  handleCart = event => {
    if (this.props.user.id) {
      this.props.createNewCartItem({id: event})
    } else {
      const cartBook = this.props.list.find(book => book.id == event)
      this.props.addItemToCart(cartBook)
    }
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
      return <h3>Loading</h3>
    }

    return (
      <Container>
        {/* <div className="imgdiv">
          <img src="/img/books2.jpg" />
        </div> */}
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
                  <Button
                    onClick={() => this.handleCart(book.id)}
                    icon="add to cart"
                    floated="right"
                    size="small"
                    basic
                    content="Add to Cart"
                  />
                  <Item.Meta>by {book.author}</Item.Meta>
                  <Item.Meta>{prettyDollar(book.price)}</Item.Meta>
                  <Item.Description>
                    {book.description.slice(0, 200)}...
                  </Item.Description>
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
