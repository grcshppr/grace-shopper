import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Grid,
  GridColumn,
  Image,
  Container,
  Divider,
  Button,
  Form
} from 'semantic-ui-react'

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
      <Container>
        <h3>Search by Title</h3>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={this.state.formValue}
            onChange={this.handleChange}
          />
          <Divider hidden />
          <span>
            <Button type="submit">Search</Button>
          </span>
        </Form>
        {/* If you submit a search, component below renders*/}
        {this.state.searchText &&
          //If there are books to display, display them
          (filteredBooks.length ? (
            <Container>
              <p>Results for '{this.state.searchText}':</p>
              {/* I'll make a separate React component for a single book soon */}
              <Grid relaxed="very" text-align="left" centered>
                {filteredBooks.map(book => {
                  return (
                    <GridColumn key={book.id} width={4} className="container">
                      <Container>
                        <Link to={`book/${book.id}`}>{book.name}</Link>
                        <p>by {book.author}</p>
                        {/* Book price is an integer in db, so we need to reformat it as a price */}
                        <p>
                          ${`${book.price
                            .toString()
                            .slice(0, -2)}.${book.price.toString().slice(-2)}`}
                        </p>
                        <p>{book.editionType}</p>
                        <Image src={book.imgUrl} />
                        <Button icon="shop" />
                      </Container>
                      <Divider hidden />
                    </GridColumn>
                  )
                })}
              </Grid>
            </Container>
          ) : (
            //If no books to display...
            <p>No results for '{this.state.searchText}'</p>
          ))}
      </Container>
    )
  }
}

export default connect(mapStateToProps)(Search)
