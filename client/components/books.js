import React, {Component} from 'react';
import {
    fetchAllBooksFromServer
} from '../reducers'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBooksFromServer: () => dispatch(fetchAllBooksFromServer())
    }
}

const mapStateToProps = state => {
    return {
        list = state.books.list,
        isFetching = state.books.isFetching
    }
}

class Books extends Component {
    componentDidMount() {
        this.props.fetchAllBooksFromServer();
    }

    render () {
        const books = this.props.list
        const isFetching = this.props.isFetching
        if(isFetching) {
            return<h1>Loading</h1>
        }
        return (
            <div>
                {
                    books.map(book => {
                        return (
                            <div key={book.id}>
                                <Link to={`book/${book.id}`}>{book.name}</Link>
                                <p>{book.price}</p>
                                <img src={book.imageUrl} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Books)