import React from 'react'
import {Container, Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const AdminHomePage = () => {
  return (
    <Container>
      <h2>Admin home page</h2>
      <Card
        as={Link}
        to="/admin/editbooks"
        header="Add and edit books here"
        description="Click here to add books to your product list and edit books"
      />
      <Card
        as={Link}
        to="/admin/orders"
        header="View all orders"
        description="Click here to view all the orders made on the site"
      />
      <Card
        as={Link}
        to="/admin/users"
        header="View all users"
        description="Click here to view all the users who belong to this site"
      />
    </Container>
  )
}

export default AdminHomePage
