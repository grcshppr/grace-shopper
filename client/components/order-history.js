import React from 'react'
import {Button, Icon, Image, Item, Label} from 'semantic-ui-react'
import {fetchUsersOrdersFromServer} from '../store/order-history'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersOrdersFromServer: () => dispatch(fetchUsersOrdersFromServer())
  }
}

const maptStateToProps = state => {
    return {
        list: state.orders.usersOrders,
        isFetching: state.orders.isFetching
    }
}
