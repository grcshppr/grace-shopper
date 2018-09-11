const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('attributes definition', () => {
    let harryPotterReview
    let HPdescription =
      'My original review was a comparison of sorts between Harry Potter and Twilight. However, this is stupid as the two are incomparable. Honestly, its not even worth discussing. Its not just that Twilight doesnt come close, it is the fact that Harry Potter transcends other similar works. Its peerless.'
    it('can handle long content', async () => {
      harryPotterReview = await Review.create({
        title: 'Harry Potter rocks',
        content: HPdescription,
        stars: 5
      })
      expect(harryPotterReview).to.be.an('object')
      expect(harryPotterReview.content).to.equal(HPdescription)
    })
  })
})
