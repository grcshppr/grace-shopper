import React, {Component} from 'react';
import {
    fetchAllBooksFromServer
} from '../store/books'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBooksFromServer: () => dispatch(fetchAllBooksFromServer())
    }
}

const mapStateToProps = state => {
    return {
        list: state.books.list,
        isFetching: state.books.isFetching
    }
}

class Books extends Component {
    componentDidMount() {
        this.props.fetchAllBooksFromServer();
    }

    render () {
        const books = this.props.list
        console.log(books)
        const isFetching = this.props.isFetching
        if(isFetching) {
            return<h1>Loading</h1>
        }
        return (
            <ul>
                {
                    books.map(book => {
                        return (
                            <li key={book.id}>
                                <Link to={`book/${book.id}`}>{book.name}</Link>
                                <p>${book.price}</p>
                                <img src={book.imageUrl} />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Books)