import React from 'react'

export default function Reviews(props) {
  const reviews = props.reviews
  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map(review => (
        <div key={review.id}>
          <h5>{review.title}</h5>
          {/* "Stars" isn't required in the review model, so rendered conditionally */}
          {review.stars && <h5>{`Rating: ${review.stars}/5`}</h5>}
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  )
}
