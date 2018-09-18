import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header, Image, Container} from 'semantic-ui-react'
import {fetchAllUsersFromServer} from '../store/allUsers'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    users: state.allUsers.users,
    isFetching: state.allUsers.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsersFromServer: () => dispatch(fetchAllUsersFromServer())
  }
}

class AdminUserPage extends Component {
  componentDidMount() {
    this.props.fetchAllUsersFromServer()
  }

  render() {
    const admins = this.props.users.filter(user => user.isAdmin)
    const users = this.props.users.filter(user => !user.isAdmin)

    return (
      <Container>
        <h3>Admins</h3>
        {admins.length &&
          admins.map(user => {
            return (
              <Container>
                <Header key={user.id} as="h3" attached="top">
                  <Image size="tiny" src={user.imgUrl} />
                  {user.email}
                </Header>
              </Container>
            )
          })}
        <h3>Users</h3>
        {users.length &&
          users.map(user => {
            return (
              <Container>
                <Header key={user.id} as="h3" attached="top">
                  <Image size="tiny" src={user.imgUrl} />
                  {user.email} {user.isAdmin}
                </Header>
              </Container>
            )
          })}
      </Container>
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminUserPage)
)
