import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {prettyDollar} from '../utils'
import {Container, Divider, Button, Form, Item} from 'semantic-ui-react'

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
            <Button basic type="submit">
              Search
            </Button>
          </span>
        </Form>
        {/* If you submit a search, component below renders*/}
        {this.state.searchText &&
          //If there are books to display, display them
          (filteredBooks.length ? (
            <Container>
              <p>Results for '{this.state.searchText}':</p>
              {/* I'll make a separate React component for a single book soon */}
              <Item.Group divided>
                {filteredBooks.map(book => {
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
          ) : (
            //If no books to display...
            <p>No results for '{this.state.searchText}'</p>
          ))}
      </Container>
    )
  }
}

export default connect(mapStateToProps)(Search)
