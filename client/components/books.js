import React, {Component} from 'react'
import {fetchAllBooksFromServer} from '../store/books'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Grid,
  GridColumn,
  Image,
  Container,
  Button,
  Divider
} from 'semantic-ui-react'

const mapDispatchToProps = dispatch => {
  return {
    fetchAllBooksFromServer: () => dispatch(fetchAllBooksFromServer())
  }
}

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
  componentDidMount() {
    this.props.fetchAllBooksFromServer()
  }

  handleFilter = event => {
    this.setState({
      selectedGenre: event.target.value
    })
  }

  render() {
    const allBooks = this.props.list
    let books
    if (this.state.selectedGenre === 'all') {
      books = allBooks
    } else {
      books = allBooks.filter(
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
                <Container>
                  <Link to={`book/${book.id}`}>{book.name}</Link>
                  {/* Book price is an integer in db, so we need to reformat it as a price */}
                  <p>
                    ${`${book.price
                      .toString()
                      .slice(0, -2)}.${book.price.toString().slice(-2)}`}
                  </p>
                  <Image src={book.imgUrl} />
                  <Button icon="shop" />
                </Container>
                <Divider hidden />
              </GridColumn>
            )
          })}
        </Grid>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
