import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = state => {
  return {books: state.books.list}
}

class Search extends Component {
  constructor() {
    super()
    //form value corresponds to text in search bar, search text corresonds to a submitted search
    this.state = {formValue: '', searchText: ''}
  }

  handleChange = evt => {
    this.setState({formValue: evt.target.value})
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const searchText = this.state.formValue
    this.setState({formValue: '', searchText: searchText})
  }

  render() {
    //This functions is triggered by submitting a search
    const filterFunc = book => {
      let normalizedSearchText = this.state.searchText
        .split(' ')
        .map(word => word.toUpperCase())
      let normalizedBookName = book.name
        .split(' ')
        .map(word => word.toUpperCase())
      //Allows for partial matches
      return normalizedSearchText.every(word =>
        normalizedBookName.includes(word)
      )
    }
    const filteredBooks = this.props.books.filter(filterFunc)

    return (
      <div>
        <h5>Search by Title</h5>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={this.state.formValue}
            onChange={this.handleChange}
          />
          <span>
            <button type="submit">Search</button>
          </span>
        </form>
        {/* If you submit a search, component below renders*/}
        {this.state.searchText &&
          //If there are books to display, display them
          (filteredBooks.length ? (
            <div>
              <p>Results for '{this.state.searchText}':</p>
              {/* I'll make a separate React component for a single book soon */}
              <ul>
                {filteredBooks.map(book => {
                  return (
                    <li key={book.id}>
                      <Link to={`book/${book.id}`}>{book.name}</Link>
                      <p>{book.author}</p>
                      {/* Book price is an integer in db, so we need to reformat it as a price */}
                      <p>
                        ${`${book.price
                          .toString()
                          .slice(0, -2)}.${book.price.toString().slice(-2)}`}
                      </p>
                      <p>{book.editionType}</p>
                      <img src={book.imageUrl} />
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            //If no books to display...
            <p>No results for '{this.state.searchText}'</p>
          ))}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Search)
