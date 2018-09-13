import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <Container>
      <h3>Welcome, {email}</h3>
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
