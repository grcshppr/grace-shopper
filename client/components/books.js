import React, {Component} from 'react'
import {fetchAllBooksFromServer} from '../store/books'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

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
        <select onChange={this.handleFilter}>
          <option value="all">All</option>
          {genres.map((genre, id) => (
            <option value={genre} key={id}>
              {genre}
            </option>
          ))}
        </select>
        <ul>
          {books.map(book => {
            return (
              <li key={book.id}>
                <Link to={`book/${book.id}`}>{book.name}</Link>
                <p>${book.price}</p>
                <p>{book.editionType}</p>
                <img src={book.imgUrl} />
                <button>add to cart</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
