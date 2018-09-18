import React, {Component} from 'react'
import {
  Segment,
  Dimmer,
  Loader,
  Image,
  Item,
  Header,
  Container,
  Divider
} from 'semantic-ui-react'
import {fetchAllOrders} from '../store/orders'
import {prettyDate, prettyDollar} from '../utils'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = state => ({
  allOrders: state.order.allOrders,
  isFetching: state.order.allOrdersAreFetching,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchAllOrders())
})

class AdminOrderPage extends Component {
  constructor() {
    super()
    this.state = {
      selectedStatus: 'all'
    }
  }
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  handleFilter = event => {
    this.setState({
      selectedStatus: event.target.value
    })
  }

  render() {
    let orders = this.props.allOrders
    const isFetching = this.props.isFetching

    if (!this.props.user.isAdmin)
      return <h1>sorry can't access this page :( ADMINS ONLY</h1>
    if (this.state.selectedStatus !== 'all') {
      orders = orders.filter(
        order => order.status === this.state.selectedStatus
      )
    }
    if (isFetching) {
      return (
        <Segment>
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>

          <Image src="/img/book" />
        </Segment>
      )
    } else {
      return (
        <Container>
          <h1>view all orders here:</h1>
          <h5>filter order by status:</h5>
          <select onChange={this.handleFilter}>
            <option value="all">all</option>
            <option value="created">created</option>
            <option value="processing">processing</option>
            <option value="canceled">canceled</option>
            <option value="completed">completed</option>
          </select>
          <Item.Group link>
            {orders.map(order => {
              return (
                <Item key={order.id}>
                  <Item.Image size="tiny" src={order.imgUrl} />
                  <Item.Content>
                    <Item.Header>Placed {prettyDate(order.date)}</Item.Header>
                    <Item.Meta content={'Placed by: ' + order.user.email} />
                    <Item.Meta content={'Status: ' + order.status} />
                    <Item.Description>
                      Total {prettyDollar(order.totalPrice)}
                      <Divider />
                    </Item.Description>
                  </Item.Content>
                </Item>
              )
            })}
          </Item.Group>
        </Container>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderPage)
