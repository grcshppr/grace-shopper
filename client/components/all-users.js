import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Header,
  GridColumn,
  Image,
  Item,
  Container,
  Button,
  Divider
} from 'semantic-ui-react'
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

class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchAllUsersFromServer()
  }

  render() {
    console.log('props', this.props)
    return (
      <Container>
        <h3>All Users</h3>
        {this.props.isFetching ? (
          <h1>Fetching</h1>
        ) : (
          this.props.users
            .sort((a, b) => {
              if (a.isAdmin && !b.isAdmin) return -1
              else if (b.isAdmin && !a.isAdmin) return 1
              else return 0
            })
            .map(user => {
              return (
                <Container>
                  <Header key={user.id} as="h3" attached="top">
                    <Image size="tiny" src={user.imgUrl} />
                    {user.email} {user.isAdmin && ' (ADMIN)'}
                  </Header>
                  {/* <Item>
                    <Item.Image size="tiny" src={user.imgUrl} />
                  </Item> */}
                </Container>
                // <Header.Content>
                //   <Divider  />
                //   Joined on {user.createdAt.slice(0, 10)}
                // </Header.Content>
                // {/* {user.isAdmin && Admin} */}
              )
            })
        )}
      </Container>
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllUsers)
)
