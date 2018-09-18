import React from 'react'
import {Container, Divider, Item} from 'semantic-ui-react'

export default function Reviews(props) {
  const reviews = props.reviews
  return (
    <Container textAlign="left">
      <h3>Reviews</h3>
      <Divider />
      {!reviews.length ? (
        <Item.Meta>no reviews at this time</Item.Meta>
      ) : (
        <Item.Group divided>
          {reviews.map(review => (
            <Item key={review.id}>
              <Item.Content>
                <Item.Header>{review.title}</Item.Header>
                {/* "Stars" isn't required in the review model, so rendered conditionally */}
                {review.stars && (
                  <Item.Meta>{`Rating: ${review.stars}/5`}</Item.Meta>
                )}
                <Item.Description>{review.content}</Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
    </Container>
  )
}
