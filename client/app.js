import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {fetchAllBooksFromServer} from './store/books'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    fetchAllBooksFromServer: () => dispatch(fetchAllBooksFromServer())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.fetchAllBooksFromServer()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
