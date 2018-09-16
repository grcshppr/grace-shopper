import React from 'react'
import {Container, Divider, Card} from 'semantic-ui-react'

export default function Reviews(props) {
  const reviews = props.reviews
  return (
    <Container textAlign="left">
      <h2>Reviews</h2>
      <Divider />
      {!reviews.length ? (
        <Card fluid>
          <h5>no reviews at this time</h5>
        </Card>
      ) : (
        reviews.map(review => (
          <Card key={review.id}>
            <h5>{review.title}</h5>
            {/* "Stars" isn't required in the review model, so rendered conditionally */}
            {review.stars && <h5>{`Rating: ${review.stars}/5`}</h5>}
            <p>{review.content}</p>
            <Divider />
          </Card>
        ))
      )}
    </Container>
  )
}
