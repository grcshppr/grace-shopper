import React, {Component} from 'react'
import {Segment, Dimmer, Loader, Image, Item, Header} from 'semantic-ui-react'
import {fetchUsersOrdersFromServer} from '../store/orders'
import {prettyDate, prettyDollar} from '../utils'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersOrdersFromServer: id => dispatch(fetchUsersOrdersFromServer(id))
  }
}

const mapStateToProps = state => {
  return {
    list: state.order.usersOrders,
    isFetching: state.order.allOrdersAreFetching,
    user: state.user
  }
}

class UsersOrders extends Component {
  componentDidMount() {
    const accountId = this.props.match.params.accountId
    this.props.fetchUsersOrdersFromServer(accountId)
  }
  render() {
    const list = this.props.list
    const isFetching = this.props.isFetching
    if (isFetching) {
      return (
        <Segment>
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>

          <Image src="/img/book" />
        </Segment>
      )
    }
    if (
      this.props.user.id === Number(this.props.match.params.accountId) ||
      this.props.user.isAdmin
    ) {
      return (
        <div>
          <Header as="h2" attached="top">
            Welcome Back {list[0] && list[0].user.firstName ? list[0].user.firstName + '!' : '!'}
          </Header>
          <Item.Group link>
            {list.map(order => {
              return (
                <Item
                  key={order.id}
                  as={Link}
                  to={`/user/${order.userId}/orders/${order.id}`}
                >
                  <Item.Image
                    size="tiny"
                    src={`/${order.order_books[0].book.imgUrl}`}
                  />
                  <Item.Content>
                    <Item.Header>Placed {prettyDate(order.date)}</Item.Header>
                    <Item.Meta content={'Status: ' + order.status} />
                    <Item.Description>
                      Total {prettyDollar(order.totalPrice)}
                    </Item.Description>
                  </Item.Content>
                </Item>
              )
            })}
          </Item.Group>
        </div>
      )
    } else {
      return <h1>Sorry, You Don't Have Access!</h1>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersOrders)
