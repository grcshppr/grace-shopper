import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Grid,
  GridColumn,
  Image,
  Container,
  Button,
  Divider,
  Card
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
        <Grid relaxed="very" text-align="left" centered>
          {books.map(book => {
            return (
              <GridColumn width={4} className="container">
                <Card>
                  <Link to={`book/${book.id}`}>{book.name}</Link>
                  <p>by {book.author}</p>
                  {/* Book price is an integer in db, so we need to reformat it as a price */}
                  <p>
                    ${`${book.price
                      .toString()
                      .slice(0, -2)}.${book.price.toString().slice(-2)}`}
                  </p>
                  <Image src={book.imgUrl} />
                  <Button icon="shop" />
                </Card>
                <Divider hidden />
              </GridColumn>
            )
          })}
        </Grid>
      </Container>
    )
  }
}

export default connect(mapStateToProps)(Books)
