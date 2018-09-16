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
  isFetching: state.order.allOrdersAreFetching
})
const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchAllOrders())
})

class AdminOrderPage extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const orders = this.props.allOrders
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
    } else {
      return (
        <Container>
          <h1>view all orders here:</h1>
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
