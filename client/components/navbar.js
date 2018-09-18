import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Header, Icon, Divider} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <Menu color="grey" size="large" secondary>
    <Header size="huge">GraceShopper</Header>
    {isLoggedIn ? (
      <Menu.Menu position="right">
        {/* The navbar will show these links after you log in */}
        <Menu.Item as={Link} name="home" to="/browse">
          <Icon name="home" />
          Browse
        </Menu.Item>
        <Menu.Item as={Link} name="search" to="/search">
          <Icon name="search" />
          Search
        </Menu.Item>
        <Menu.Item as={Link} name="shoppingcart" to="/cart">
          <Icon name="shopping cart" />
          My Cart
        </Menu.Item>
        <Menu.Item as={Link} to={`/user/${user.id}/orders`}>
          Account
        </Menu.Item>
        <Menu.Item href="#" onClick={handleClick}>
          Logout
        </Menu.Item>
        <Menu.Item as={Link} name="checkout" to="/checkout">
          Checkout
        </Menu.Item>

        {user.isAdmin && (
          <Menu.Item as={Link} name="admin" to="/admin">
            Admin Page
          </Menu.Item>
        )}
      </Menu.Menu>
    ) : (
      <Menu.Menu position="right">
        {/* The navbar will show these links before you log in */}
        <Menu.Item as={Link} name="home" to="/browse">
          <Icon name="browser" />
          Browse
        </Menu.Item>
        <Menu.Item as={Link} name="signup" to="/signup">
          Sign Up
        </Menu.Item>
        <Menu.Item as={Link} name="login" to="/login">
          Login
        </Menu.Item>
        <Menu.Item as={Link} name="search" to="/search">
          Search
        </Menu.Item>
        <Menu.Item as={Link} name="shoppingcart" to="/cart">
          <Icon name="shopping cart" />
          My Cart
        </Menu.Item>
      </Menu.Menu>
    )}
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
