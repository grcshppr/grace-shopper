import React, {Component} from 'react'
import {Segment, Dimmer, Loader, Image, Item, Header} from 'semantic-ui-react'
import {fetchUsersOrdersFromServer} from '../store/orders'
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

export const prettyDollar = aNum => {
  return '$' + aNum.toString().slice(0, -2) + '.' + aNum.toString().slice(-2)
}

export const prettyDate = aDate => {
  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  let day = ''
  let monthIndex = 0
  const startDay = aDate.slice(8, 10)
  if (startDay.slice(0, 1) === '0') {
    day = startDay.slice(1)
  } else {
    day = startDay
  }
  const startMonth = aDate.slice(5, 7)
  if (startMonth.slice(0, 1) === '0') {
    monthIndex = Number(startMonth.slice(1))
  }
  const year = aDate.slice(0, 4)

  return day + ' ' + monthNames[monthIndex] + ' ' + year
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

          <Image src="http://www.clker.com/cliparts/R/w/q/4/j/l/book.svg" />
        </Segment>
      )
    }
    console.log('user object', this.props.user)
    if (
      this.props.user.id === Number(this.props.match.params.accountId) ||
      this.props.user.isAdmin
    ) {
      return (
        <div>
          <Header as="h2" attached="top">
            Your Orders{' '}
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
