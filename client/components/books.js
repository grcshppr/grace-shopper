import React, {Component} from 'react'
import {fetchAllBooksFromServer} from '../store/books'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid, GridColumn, Image, Container} from 'semantic-ui-react'

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
      <div>
        <Container relaxed="very">
          <h4>Filter:</h4>
          <select onChange={this.handleFilter}>
            <option value="all">All</option>
            {genres.map((genre, id) => (
              <option value={genre} key={id}>
                {genre}
              </option>
            ))}
          </select>
        </Container>
        <Grid container relaxed="very" text-align="left" columns={4}>
          {books.map(book => {
            return (
              <GridColumn>
                <Link to={`book/${book.id}`}>{book.name}</Link>
                <p>${book.price}</p>
                <p>{book.editionType}</p>
                <Image src={book.imgUrl} />
                <button>add to cart</button>
              </GridColumn>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
