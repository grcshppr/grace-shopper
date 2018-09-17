import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {prettyDollar} from '../utils'
import {
  Dropdown,
  Image,
  Container,
  Button,
  Divider,
  Item
} from 'semantic-ui-react'

const mapStateToProps = state => {
  return {
    list: state.books.list,
    genres: state.books.genres,
    isFetching: state.books.isFetching
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
                  <Button icon="shop" floated="right" />
                  <Item.Header as={Link} to={`book/${book.id}`}>
                    {book.name}
                  </Item.Header>
                  <Item.Meta>by {book.author}</Item.Meta>
                  {/* Book price is an integer in db, so we need to reformat it as a price */}
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

export default connect(mapStateToProps)(Books)
